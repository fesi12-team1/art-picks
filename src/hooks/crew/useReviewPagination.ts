import { useMemo } from 'react';

interface UsePaginationProps {
  currentPage: number; // 0-indexed internally
  totalPages: number;
  onPageChange: (page: number) => void;
  isMobile?: boolean; // For responsive behavior
}

interface UsePaginationReturn {
  // State
  currentPage: number; // 0-indexed
  totalPages: number;
  displayedPages: number[]; // Array of page numbers to display, -1 represents ellipsis

  // Navigation
  canGoPrevious: boolean;
  canGoNext: boolean;
  goToPage: (page: number) => void;
  goToPrevious: () => void;
  goToNext: () => void;
}

/**
 * Helper function to calculate which page numbers to display based on current page
 * and total pages, following the design specifications.
 * Uses -1 to represent ellipsis positions in the returned array.
 *
 * @param current - Current page (0-indexed)
 * @param total - Total number of pages
 * @param maxElements - Maximum number of elements including ellipsis (5 for mobile, 7 for tablet+)
 * @returns Array of page numbers where -1 represents an ellipsis
 */
function getDisplayedPages(
  current: number,
  total: number,
  maxElements: number
): number[] {
  // Edge case: show all if total pages fit within max elements
  if (total <= maxElements) {
    return Array.from({ length: total }, (_, i) => i);
  }

  // Reserve 2 slots for ellipsis (one at start, one at end when needed)
  const maxPageNumbers = maxElements - 2;
  const startThreshold = 2; // Pages 0, 1, 2 are considered "start"
  const endThreshold = total - 3; // Last 3 pages are considered "end"

  // At START: [0] [1] [2] [3] [4] ... [N-1]
  if (current <= startThreshold) {
    const pages = Array.from({ length: maxPageNumbers }, (_, i) => i);
    pages.push(-1); // Ellipsis
    pages.push(total - 1); // Always include last page
    return pages;
  }

  // At END: [0] ... [N-5] [N-4] [N-3] [N-2] [N-1]
  if (current >= endThreshold) {
    const pages = [0]; // First page
    pages.push(-1); // Ellipsis
    // Add last maxPageNumbers pages
    for (let i = total - maxPageNumbers; i < total; i++) {
      pages.push(i);
    }
    return pages;
  }

  // In MIDDLE: [0] ... [current-1] [current] [current+1] ... [N-1]
  if (maxElements === 5) {
    // Mobile MIDDLE: [0] ... [current] ... [N-1]
    return [0, -1, current, -1, total - 1];
  }
  // Desktop MIDDLE: [0] ... [current-1] [current] [current+1] ... [N-1]
  return [0, -1, current - 1, current, current + 1, -1, total - 1];
}

/**
 * Custom hook for pagination logic and state management.
 *
 * @param props - Pagination configuration
 * @returns Pagination state and handlers
 *
 * @example
 * ```typescript
 * const pagination = usePagination({
 *   currentPage: 0,
 *   totalPages: 10,
 *   onPageChange: (page) => setCurrentPage(page),
 *   isMobile: true
 * });
 * ```
 */
export function useReviewPagination({
  currentPage,
  totalPages,
  onPageChange,
  isMobile = false,
}: UsePaginationProps): UsePaginationReturn {
  // Determine max elements based on screen size
  // Mobile: 5 elements (3 page numbers + 2 ellipsis potential)
  // Tablet/Desktop: 7 elements (5 page numbers + 2 ellipsis potential)
  const maxElements = isMobile ? 5 : 7;

  // Calculate displayed pages with -1 representing ellipsis
  const pages = useMemo(
    () => getDisplayedPages(currentPage, totalPages, maxElements),
    [currentPage, totalPages, maxElements]
  );

  // Navigation flags
  const canGoPrevious = currentPage > 0;
  const canGoNext = currentPage < totalPages - 1;

  // Navigation handlers
  const goToPage = (page: number) => {
    if (page >= 0 && page < totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const goToPrevious = () => {
    if (canGoPrevious) {
      onPageChange(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (canGoNext) {
      onPageChange(currentPage + 1);
    }
  };

  return {
    // State
    currentPage,
    totalPages,
    displayedPages: pages,

    // Navigation
    canGoPrevious,
    canGoNext,
    goToPage,
    goToPrevious,
    goToNext,
  };
}
