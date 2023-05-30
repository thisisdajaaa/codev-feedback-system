import clsx from "clsx";
import React, { FC, useCallback, useMemo, useState } from "react";

import { downloadCSV } from "@/utils/files";

import { Pagination } from "@/components/Pagination";
import { Table } from "@/components/Table";
import { Typography } from "@/components/Typography";

import { SurveyStatus } from "@/models/Survey/config";

import { getSurveyListAPI } from "@/api/surveys";
import type { SurveysResponse } from "@/features/survey/types";

import { INITIAL_PAGE, PAGE_SIZE } from "../config";
import type { ResponsesProps, SurveyListProps } from "../types";

const SurveyList: FC<SurveyListProps> = (props) => {
  const { items, handleSelectSurvey } = props;

  const [surveyList, setSurveyList] = useState<ResponsesProps["items"]["data"]>(
    items.data || []
  );
  const [isListLoading, setIsListLoading] = useState<boolean>(false);
  const [isCSVLoading, setIsCSVLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(INITIAL_PAGE);
  const [pageCount, setPageCount] = useState<number>(items.count || PAGE_SIZE);

  const handlePageChange = useCallback(async (page: number) => {
    setIsListLoading(true);

    const queryParams = { page, limit: PAGE_SIZE };

    const { success, data, count } = await getSurveyListAPI(queryParams);

    if (success) setSurveyList(data || []);
    else setSurveyList([]);

    setCurrentPage(page);
    setPageCount(count || PAGE_SIZE);

    setIsListLoading(false);
  }, []);

  const handleDownloadCSV = useCallback(async () => {
    setIsCSVLoading(true);

    const { success, data } = await getSurveyListAPI();

    if (success && data) downloadCSV<SurveysResponse>(data, "surveyList");

    setIsCSVLoading(false);
  }, []);

  const { tableColumns, tableData } = useMemo(() => {
    const renderChip = (status: string) => {
      const mappedStatus = {
        [SurveyStatus.DRAFT]: "bg-gray-500",
        [SurveyStatus.ACTIVE]: "bg-blue-500",
        [SurveyStatus.FINISHED]: "bg-green-500",
      };

      return (
        <div
          className={clsx(
            "mx-[1.125rem] rounded-[15px] px-[1.125rem] py-[7px]",
            "hidden sm:inline",
            mappedStatus[status as keyof typeof SurveyStatus]
          )}>
          <Typography
            variant="p"
            size="text-sm"
            lineHeight="leading-[1.5rem]"
            color="text-white"
            className="font-normal uppercase">
            {status}
          </Typography>
        </div>
      );
    };

    const tableData = (surveyList || [])?.map(({ id, title, status }) => ({
      id,
      surveyor: title,
      chip: renderChip(status),
    }));

    const tableColumns = [
      { key: "surveyor", title: "Surveyor" },
      { key: "chip", title: "Chip" },
    ];

    return { tableData, tableColumns };
  }, [surveyList]);

  const csvProps = useMemo(
    () => ({
      onClick: handleDownloadCSV,
      isLoading: isCSVLoading,
    }),
    [handleDownloadCSV, isCSVLoading]
  );

  return (
    <div className="flex flex-col gap-[14px] md:mt-[57px]">
      <Table
        title="Survey List"
        data={tableData}
        columns={tableColumns}
        onClick={handleSelectSurvey}
        isLoading={isListLoading}
      />

      <Pagination
        currentPage={currentPage}
        totalCount={items.total || 0}
        pageSize={pageCount}
        onPageChange={handlePageChange}
        csv={csvProps}
      />
    </div>
  );
};

export { SurveyList };
