import clsx from "clsx";
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";

import { downloadCSV } from "@/utils/files";

import { Pagination } from "@/components/Pagination";
import { Table } from "@/components/Table";
import { Variations } from "@/components/Table/config";
import { Typography } from "@/components/Typography";

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

      const { success, count, data, total } =
        await getAnsweredSurveysByTemplateAPI(selectedSurvey, queryParam);

      if (success) {
        setAnswerList(data || []);
        setPageCount(count || PAGE_SIZE);
        setTotal(total || INITIAL_TOTAL);

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
      isAnonymous?: boolean
    ) => {
      return (
        <Typography
          variant="p"
          color="text-gray-600"
          size="text-lg"
          textAlign={value === "--" ? "text-center" : "text-left"}
          className={clsx(
            "px-4",
            selectedUser === id && "font-semibold",
            isAnonymous && value === "Anonymous" && "italic"
          )}>
          {value}
        </Typography>
      );
    };

    const tableData = (answerList || [])?.map(
      ({ id, isAnonymous, answeredBy, createdAt }, index) => {
        const txtVisibility = isAnonymous ? "Private" : "Public";
        const txtName = isAnonymous ? "Anonymous" : answeredBy.name || "--";
        const txtEmail = isAnonymous ? "Anonymous" : answeredBy.email || "--";

        return {
          id: String(answeredBy.id) || "",
          item: renderCellItem(id, index + 1),
          visibility: renderCellItem(id, txtVisibility, isAnonymous),
          name: renderCellItem(id, txtName, isAnonymous),
          email: renderCellItem(id, txtEmail, isAnonymous),
          timestamp: renderCellItem(id, createdAt),
        };
      }
    );

    const tableColumns = [
      { key: "item", title: "Item", style: "w-[107px]" },
      { key: "visibility", title: "Visiblity", style: "w-[128px]" },
      { key: "name", title: "Name", style: "w-[402px]" },
      { key: "email", title: "Email Address", style: "w-[402px]" },
      { key: "timestamp", title: "Timestamp", style: "w-[248px]" },
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
    <div className="mt-[19.5px] flex flex-col gap-[14px]">
      <Table
        title="Responses"
        data={tableData}
        columns={tableColumns}
        variation={Variations.Secondary}
        isLoading={isListLoading}
        onClick={(row) => setSelectedUser(row.id)}
      />

      <Pagination
        currentPage={currentPage}
        totalCount={total || INITIAL_TOTAL}
        pageSize={pageCount}
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
