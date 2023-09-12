import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Pagination from '../components/pagination';

describe('Pagination Component', () => {
  const pageCount = 5;
  const currentPage = 2;
  const onNext = jest.fn();
  const onPrev = jest.fn();
  const onPageSelected = jest.fn();

  beforeEach(() => {
    onNext.mockClear();
    onPrev.mockClear();
    onPageSelected.mockClear();
  });

  it('should render correctly with given props', () => {
    const { container } = render(
      <Pagination
        pageCount={pageCount}
        currentPage={currentPage}
        onNext={onNext}
        onPrev={onPrev}
        onPageSelected={onPageSelected}
      />
    );

    const pageItems = container.querySelectorAll('li');
    expect(pageItems.length).toBe(pageCount + 2); // pageCount + prev + next

    // Test the active page item
    const activePageItem = container.querySelector('.text-blue-600');
    expect(activePageItem).toBeInTheDocument();
    expect(activePageItem).toHaveTextContent(currentPage.toString());
  });

  it('should call onNext when next button is clicked', () => {
    const { getByText } = render(
      <Pagination
        pageCount={pageCount}
        currentPage={currentPage}
        onNext={onNext}
        onPrev={onPrev}
        onPageSelected={onPageSelected}
      />
    );

    const nextButton = getByText('Next');
    fireEvent.click(nextButton);

    expect(onNext).toHaveBeenCalled();
  });

  it('should call onPrev when previous button is clicked', () => {
    const { getByText } = render(
      <Pagination
        pageCount={pageCount}
        currentPage={currentPage}
        onNext={onNext}
        onPrev={onPrev}
        onPageSelected={onPageSelected}
      />
    );

    const prevButton = getByText('Previous');
    fireEvent.click(prevButton);

    expect(onPrev).toHaveBeenCalled();
  });

  it('should call onPageSelected when a page number is clicked', () => {
    const { getByText } = render(
      <Pagination
        pageCount={pageCount}
        currentPage={currentPage}
        onNext={onNext}
        onPrev={onPrev}
        onPageSelected={onPageSelected}
      />
    );

    const pageNumber = 3;
    const pageLink = getByText(pageNumber.toString());
    fireEvent.click(pageLink);

    expect(onPageSelected).toHaveBeenCalledWith(pageNumber);
  });
});
