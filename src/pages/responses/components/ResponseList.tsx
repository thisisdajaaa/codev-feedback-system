import clsx from "clsx";
import moment from "moment";
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";

import { downloadCSV } from "@/utils/files";

import { Pagination } from "@/components/Pagination";
import { Table } from "@/components/Table";
import { TableVariations } from "@/components/Table/config";
import { Typography } from "@/components/Typography";
import type { TailwindTextAlign } from "@/components/Typography/types";

import { getAnsweredSurveysByTemplateAPI } from "@/api/surveys";
import { SurveysResponse } from "@/features/survey/types";

import { ResponseModal } from "./ResponseModal";
import { INITIAL_PAGE, INITIAL_TOTAL, PAGE_SIZE } from "../config";
import type { ResponseListProps } from "../types";

const ResponseList: FC<ResponseListProps> = (props) => {
  const { selectedSurvey } = props;

  const [answerList, setAnswerList] = useState<SurveysResponse>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [isListLoading, setIsListLoading] = useState<boolean>(false);
  const [isCSVLoading, setIsCSVLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(INITIAL_PAGE);
  const [pageCount, setPageCount] = useState<number>(PAGE_SIZE);
  const [total, setTotal] = useState<number>(INITIAL_TOTAL);

  const handleFetchData = useCallback(
    async (queryParam: Record<string, unknown>) => {
      setIsListLoading(true);

      const { success, data, total, count } =
        await getAnsweredSurveysByTemplateAPI(selectedSurvey, queryParam);

      if (success) {
        setAnswerList(data || []);
        setTotal(total || INITIAL_TOTAL);
        setPageCount(count || PAGE_SIZE);

        if (queryParam?.page) setCurrentPage(+queryParam?.page);
      }

      setIsListLoading(false);
    },
    [selectedSurvey]
  );

  useEffect(() => {
    const queryParams = { page: INITIAL_PAGE, limit: PAGE_SIZE };

    handleFetchData(queryParams);
  }, [handleFetchData]);

  const handlePageChange = useCallback(
    async (page: number) => {
      if (page === currentPage) return;

      const queryParams = { page, limit: PAGE_SIZE };
      handleFetchData(queryParams);
    },
    [currentPage, handleFetchData]
  );

  const handleDownloadCSV = useCallback(async () => {
    setIsCSVLoading(true);

    const { success, data } = await getAnsweredSurveysByTemplateAPI(
      selectedSurvey
    );

    if (success && data) downloadCSV<SurveysResponse>(data, "userList");

    setIsCSVLoading(false);
  }, [selectedSurvey]);

  const { tableColumns, tableData } = useMemo(() => {
    const renderCellItem = (
      id: string,
      value: string | number,
      textAlign: TailwindTextAlign,
      isAnonymous?: boolean
    ) => {
      return (
        <Typography
          variant="p"
          color="text-gray-600"
          size="text-lg"
          textAlign={value === "--" ? "text-center" : textAlign}
          className={clsx(
            "px-4",
            selectedUser === id && "font-semibold",
            isAnonymous && value === "Anonymous" && "italic"
          )}
        >
          {value}
        </Typography>
      );
    };

    const tableData = (answerList || [])?.map(
      ({ id, isAnonymous, answeredBy, createdAt }, index) => {
        const txtVisibility = isAnonymous ? "Private" : "Public";
        const txtName = isAnonymous ? "Anonymous" : answeredBy.name || "--";
        const txtEmail = isAnonymous ? "Anonymous" : answeredBy.email || "--";
        const txtTimestamp = moment(createdAt).format("YYYY-MM-DD HH:mm:ss");

        return {
          id: String(answeredBy?.id) || "",
          no: renderCellItem(id, index + 1, "text-center"),
          visibility: renderCellItem(
            id,
            txtVisibility,
            "text-center",
            isAnonymous
          ),
          name: renderCellItem(id, txtName, "text-left", isAnonymous),
          email: renderCellItem(id, txtEmail, "text-left", isAnonymous),
          timestamp: renderCellItem(id, txtTimestamp, "text-center"),
        };
      }
    );

    const tableColumns = [
      { key: "no", title: "No", style: "w-[6.688rem]" },
      { key: "visibility", title: "Visibility", style: "w-[8rem]" },
      { key: "name", title: "Name", style: "w-[25.125rem]" },
      { key: "email", title: "Email Address", style: "w-[25.125rem]" },
      { key: "timestamp", title: "Timestamp", style: "w-[15.5rem]" },
    ];

    return { tableData, tableColumns };
  }, [answerList, selectedUser]);

  const csvProps = useMemo(
    () => ({
      onClick: handleDownloadCSV,
      isLoading: isCSVLoading,
    }),
    [handleDownloadCSV, isCSVLoading]
  );

  return (
    <div className="mt-[1.219rem] flex flex-col gap-[0.875rem]">
      <Table
        title="Responses"
        data={tableData}
        columns={tableColumns}
        variation={TableVariations.Secondary}
        isLoading={isListLoading}
        onClick={(row) => setSelectedUser(row.id)}
      />

      <Pagination
        currentPage={currentPage}
        totalCount={total}
        pageSize={pageCount}
        defaultPageSize={PAGE_SIZE}
        onPageChange={handlePageChange}
        csv={csvProps}
      />

      {!!selectedUser && (
        <ResponseModal
          open={!!selectedUser}
          selectedUser={selectedUser}
          selectedSurvey={selectedSurvey}
          handleClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
};

export { ResponseList };
