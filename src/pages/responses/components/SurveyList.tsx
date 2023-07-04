import clsx from "clsx";
import React, { FC, useCallback, useMemo, useState } from "react";

import { downloadCSV } from "@/utils/files";

import { Pagination } from "@/components/Pagination";
import { SearchBar } from "@/components/SearchBar";
import { Table } from "@/components/Table";
import { Typography } from "@/components/Typography";

import { SurveyStatus } from "@/models/Survey/config";

import { searchQuestionnaires } from "@/api/questionnaire";
import type { GetQuestionnaireResponse } from "@/features/questionnaire/types";

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
  const [pageCount, setPageCount] = useState<number>(items.count || PAGE_SIZE);
  const [total, setTotal] = useState<number>(items.total || INITIAL_TOTAL);
  const [searchStr, setSearchStr] = useState<string>("");
  const [filterStr, setFilterStr] = useState<string>("");
  const handlePageChange = useCallback(
    async (page: number) => {
      if (page === currentPage) return;

      setIsListLoading(true);

      const queryParams = {
        page,
        limit: PAGE_SIZE,
        isResponses: true,
        title: searchStr,
        status: filterStr,
      };

      const { success, data, count } = await searchQuestionnaires(queryParams);

      if (success) setSurveyList(data || []);

      setCurrentPage(page);
      setPageCount(count || PAGE_SIZE);

      setIsListLoading(false);
    },
    [currentPage, filterStr, searchStr]
  );

  const handleDownloadCSV = useCallback(async () => {
    setIsCSVLoading(true);

    const { success, data } = await searchQuestionnaires();

    if (success && data)
      downloadCSV<GetQuestionnaireResponse[]>(data, "surveyList");

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
        [SurveyStatus.DELETED]: "bg-gray-500",
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
      surveyor: renderTitle(id, title || ""),
      chip: renderChip(String(status)),
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
  const handleSearch = async (query: string, filter: string) => {
    setIsListLoading(true);

    setSearchStr(query);
    setFilterStr(filter);

    const queryParams = {
      page: currentPage,
      limit: PAGE_SIZE,
      title: query,
      status: filter,
      isResponses: true,
    };

    const { success, data, count, total } = await searchQuestionnaires(
      queryParams
    );
    if (success) {
      setSurveyList(data || []);
      setCurrentPage(currentPage);
      setPageCount(count || PAGE_SIZE);
      setTotal(total || INITIAL_TOTAL);
      // setQuestionnaires(response as GetQuestionnaireResponse[]);
      // setTotalResults(total || INITIAL_ITEM_COUNT);
      // setItemCount(count || PAGE_SIZE);
      setIsListLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-[0.875rem] md:mt-[3.563rem]">
      <SearchBar onSearch={handleSearch} showDraft={false} />
      <Table
        title="Survey List"
        data={tableData}
        columns={tableColumns}
        onClick={handleSelectSurvey}
        isLoading={isListLoading}
      />

      <Pagination
        currentPage={currentPage}
        totalCount={total || INITIAL_TOTAL}
        defaultPageSize={PAGE_SIZE}
        pageSize={pageCount}
        onPageChange={handlePageChange}
        csv={csvProps}
      />
    </div>
  );
};

export { SurveyList };
