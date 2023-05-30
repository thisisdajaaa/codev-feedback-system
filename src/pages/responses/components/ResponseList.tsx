import React, { FC, useCallback, useEffect, useMemo, useState } from "react";

import { Pagination } from "@/components/Pagination";
import { Table } from "@/components/Table";
import { Variations } from "@/components/Table/config";

import { getAnsweredSurveysByTemplateAPI } from "@/api/surveys";
import { SurveysResponse } from "@/features/survey/types";

import { INITIAL_PAGE, INITIAL_TOTAL, PAGE_SIZE } from "../config";
import { ResponseListProps } from "../types";

const ResponseList: FC<ResponseListProps> = (props) => {
  const { selectedSurvey } = props;

  const [answerList, setAnswerList] = useState<SurveysResponse>([]);
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
      const queryParams = { page, limit: PAGE_SIZE };
      handleFetchData(queryParams);
    },
    [handleFetchData]
  );

  const { tableColumns, tableData } = useMemo(() => {
    const tableData = (answerList || [])?.map(
      ({ id, isAnonymous, answeredBy, createdAt }, index) => ({
        id,
        item: index + 1,
        visibility: isAnonymous ? "Public" : "Private",
        name: isAnonymous ? "Anonymous" : answeredBy.name,
        email: isAnonymous ? "Anonymous" : answeredBy.email,
        timestamp: createdAt,
      })
    );

    const tableColumns = [
      { key: "item", title: "Item", style: "w-[107px]" },
      { key: "visibility", title: "Visiblity", style: "w-[128px]" },
      { key: "name", title: "Name", style: "w-[402px]" },
      { key: "email", title: "Email Address", style: "w-[402px]" },
      { key: "timestamp", title: "Timestamp", style: "w-[248px]" },
    ];

    return { tableData, tableColumns };
  }, [answerList]);

  return (
    <div className="mt-[19.5px] flex flex-col gap-[14px]">
      <Table
        title="Responses"
        data={tableData}
        columns={tableColumns}
        variation={Variations.Secondary}
        isLoading={isListLoading}
      />

      <Pagination
        currentPage={currentPage}
        totalCount={total || INITIAL_TOTAL}
        pageSize={pageCount}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export { ResponseList };
