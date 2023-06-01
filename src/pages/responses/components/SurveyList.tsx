import clsx from "clsx";
import React, { FC, useCallback, useMemo, useState } from "react";

import { downloadCSV } from "@/utils/files";

import { Pagination } from "@/components/Pagination";
import { Table } from "@/components/Table";
import { Typography } from "@/components/Typography";

import { SurveyStatus } from "@/models/Survey/config";

import { getSurveyListAPI } from "@/api/surveys";
import type { SurveysResponse } from "@/features/survey/types";

import { INITIAL_PAGE, INITIAL_TOTAL, PAGE_SIZE } from "../config";
import type { ResponsesProps, SurveyListProps } from "../types";

const SurveyList: FC<SurveyListProps> = (props) => {
  const { items, handleSelectSurvey, selectedSurvey } = props;

  const [surveyList, setSurveyList] = useState<ResponsesProps["items"]["data"]>(
    items.data || []
  );
  const [isListLoading, setIsListLoading] = useState<boolean>(false);
  const [isCSVLoading, setIsCSVLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(INITIAL_PAGE);
  const [pageCount, setPageCount] = useState<number>(
    items.count || INITIAL_TOTAL
  );

  const handlePageChange = useCallback(
    async (page: number) => {
      if (page === currentPage) return;

      setIsListLoading(true);

      const queryParams = { page, limit: PAGE_SIZE };

      const { success, data, count } = await getSurveyListAPI(queryParams);

      if (success) setSurveyList(data || []);

      setCurrentPage(page);
      setPageCount(count || PAGE_SIZE);

      setIsListLoading(false);
    },
    [currentPage]
  );

  const handleDownloadCSV = useCallback(async () => {
    setIsCSVLoading(true);

    const { success, data } = await getSurveyListAPI();

    if (success && data) downloadCSV<SurveysResponse>(data, "surveyList");

    setIsCSVLoading(false);
  }, []);

  const { tableColumns, tableData } = useMemo(() => {
    const renderTitle = (id: string, title: string) => {
      return (
        <Typography
          variant="p"
          size="text-lg"
          lineHeight="leading-[1.688rem]"
          color="text-gray-600"
          className={clsx(
            "px-4 capitalize",
            id === selectedSurvey ? "font-semibold" : "font-normal"
          )}
        >
          {title}
        </Typography>
      );
    };
    const renderChip = (status: string) => {
      const mappedStatus = {
        [SurveyStatus.DRAFT]: "bg-gray-500",
        [SurveyStatus.ACTIVE]: "bg-blue-500",
        [SurveyStatus.FINISHED]: "bg-green-500",
      };

      return (
        <div
          className={clsx(
            "mx-[1.125rem] rounded-[0.938rem] px-[1.125rem] py-[0.438rem]",
            "hidden sm:inline",
            mappedStatus[status as keyof typeof SurveyStatus]
          )}
        >
          <Typography
            variant="p"
            size="text-sm"
            lineHeight="leading-[1.5rem]"
            color="text-white"
            className="font-normal uppercase"
          >
            {status}
          </Typography>
        </div>
      );
    };

    const tableData = (surveyList || [])?.map(({ id, title, status }) => ({
      id,
      surveyor: renderTitle(id, title),
      chip: renderChip(status),
    }));

    const tableColumns = [
      { key: "surveyor", title: "Surveyor" },
      { key: "chip", title: "Chip" },
    ];

    return { tableData, tableColumns };
  }, [selectedSurvey, surveyList]);

  const csvProps = useMemo(
    () => ({
      onClick: handleDownloadCSV,
      isLoading: isCSVLoading,
    }),
    [handleDownloadCSV, isCSVLoading]
  );

  return (
    <div className="flex flex-col gap-[0.875rem] md:mt-[3.563rem]">
      <Table
        title="Survey List"
        data={tableData}
        columns={tableColumns}
        onClick={handleSelectSurvey}
        isLoading={isListLoading}
      />

      <Pagination
        currentPage={currentPage}
        totalCount={items.total || INITIAL_TOTAL}
        pageSize={pageCount}
        onPageChange={handlePageChange}
        csv={csvProps}
      />
    </div>
  );
};

export { SurveyList };
