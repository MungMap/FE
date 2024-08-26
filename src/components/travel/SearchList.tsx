import { css } from "@emotion/react";

const SearchList = ({ data, searchParams, setSearchParams }: any) => {
  //     category: "펜션",
  // searchText: "양양군",
  // page: 1,
  // pageSize: 30,
  return (
    <div css={rootStyles}>
      <div>현재 검색 지역은 '{searchParams?.searchText}'입니다</div>
    </div>
  );
};

export default SearchList;

const rootStyles = css`
  width: 100%;
  height: 50vh;
  padding: 6px 18px;
`;
