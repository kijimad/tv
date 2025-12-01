import { Button, Flex, IconButton, Icon } from "@chakra-ui/react";
import {
  IoChevronBack,
  IoChevronForward,
  IoEllipsisHorizontal,
} from "react-icons/io5";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = [];
  const maxVisiblePages = 5;

  // ページ番号のボタンを生成する
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  // 終端に達した場合、開始位置を調整する
  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (totalPages === 0) {
    return null;
  }

  return (
    <Flex justify="center" align="center" gap={2} mt={6}>
      <IconButton
        aria-label="前のページ"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        size="sm"
        variant="outline"
      >
        <IoChevronBack />
      </IconButton>

      {startPage > 1 && (
        <>
          <Button onClick={() => onPageChange(1)} size="sm" variant="outline">
            1
          </Button>
          {startPage > 2 && (
            <Icon fontSize="xl" color="gray.500">
              <IoEllipsisHorizontal />
            </Icon>
          )}
        </>
      )}

      {pages.map((page) => (
        <Button
          key={page}
          onClick={() => onPageChange(page)}
          variant={page === currentPage ? "solid" : "outline"}
          size="sm"
        >
          {page}
        </Button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <Icon fontSize="xl" color="gray.500">
              <IoEllipsisHorizontal />
            </Icon>
          )}
          <Button
            onClick={() => onPageChange(totalPages)}
            size="sm"
            variant="outline"
          >
            {totalPages}
          </Button>
        </>
      )}

      <IconButton
        aria-label="次のページ"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        size="sm"
        variant="outline"
      >
        <IoChevronForward />
      </IconButton>
    </Flex>
  );
}
