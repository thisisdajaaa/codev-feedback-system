import clsx from "clsx";
import { FC, useCallback, useEffect, useMemo, useState } from "react";

import { downloadCSV } from "@/utils/files";

import { Pagination } from "@/components/Pagination";
import { Table } from "@/components/Table";
import { TableVariations } from "@/components/Table/config";
import { Typography } from "@/components/Typography";
import type { TailwindTextAlign } from "@/components/Typography/types";

import { getUserListAPI } from "@/api/users";
import type { UserListResponse, UserResponse } from "@/features/user/types";

import { INITIAL_ITEM_COUNT, INITIAL_PAGE, TABLE_PAGE_SIZE } from "../config";

const EmployeeList: FC = () => {
  const [isListLoading, setIsListLoading] = useState<boolean>(false);
  const [userList, setUserList] = useState<UserListResponse>([]);
  const [total, setTotal] = useState<number>(INITIAL_ITEM_COUNT);
  const [itemCount, setItemCount] = useState<number>(TABLE_PAGE_SIZE);
  const [currentPage, setCurrentPage] = useState<number>(INITIAL_PAGE);
  const [isCSVLoading, setIsCSVLoading] = useState<boolean>(false);

  const fetchUsers = useCallback(
    async (queryParam: Record<string, unknown>) => {
      setIsListLoading(true);

      const {
        success,
        data: response,
        count,
        total,
      } = await getUserListAPI(queryParam);

      if (success) {
        setUserList(response as UserListResponse);
        setItemCount(count || TABLE_PAGE_SIZE);
        setTotal(total || INITIAL_ITEM_COUNT);

        if (queryParam?.page) setCurrentPage(+queryParam?.page);
      }

      setIsListLoading(false);
    },
    []
  );

  useEffect(() => {
    const queryParams = { page: INITIAL_PAGE, limit: TABLE_PAGE_SIZE };
    fetchUsers(queryParams);
  }, [fetchUsers]);

  const handlePageChange = useCallback(
    async (page: number) => {
      if (page === currentPage) return;

      const queryParams = { page, limit: TABLE_PAGE_SIZE };

      fetchUsers(queryParams);
    },
    [currentPage, fetchUsers]
  );

  const handleDownloadCSV = useCallback(async () => {
    setIsCSVLoading(true);
    true;

    const { success, data } = await getUserListAPI();

    if (success && data) downloadCSV<UserResponse>(data, "userList");

    setIsCSVLoading(false);
  }, []);

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
            isAnonymous && value === "Anonymous" && "italic"
          )}
        >
          {value}
        </Typography>
      );
    };

    const tableData = (userList || [])?.map(
      ({ id, name, email, role }, index) => {
        const txtName = name || "--";
        const txtEmail = email || "--";
        const txtRole = role || "--";

        return {
          id: String(id) || "",
          item: renderCellItem(id, index + 1, "text-center"),
          name: renderCellItem(id, txtName, "text-left"),
          email: renderCellItem(id, txtEmail, "text-left"),
          role: renderCellItem(id, txtRole, "text-center"),
        };
      }
    );

    const tableColumns = [
      { key: "item", title: "Item", style: "w-[6.688rem]" },
      { key: "name", title: "Name", style: "w-[25.125rem]" },
      { key: "email", title: "Email Address", style: "w-[25.125rem]" },
      { key: "role", title: "Role", style: "w-[15.5rem]" },
    ];

    return { tableData, tableColumns };
  }, [userList]);

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
        title="Employees"
        data={tableData}
        columns={tableColumns}
        variation={TableVariations.Secondary}
        isLoading={isListLoading}
      />

      <Pagination
        currentPage={currentPage}
        totalCount={total}
        pageSize={itemCount}
        defaultPageSize={TABLE_PAGE_SIZE}
        onPageChange={handlePageChange}
        csv={csvProps}
      />
    </div>
  );
};

export { EmployeeList };
