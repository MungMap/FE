import { css } from "@emotion/react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";

const Search = () => {
  return (
    <div css={rootStyle}>
      <div css={searchWrap}>
        <LocationOnIcon
          sx={{
            fontSize: "24px",
            color: "#FCAC7A",
          }}
        />
        <input
          type="text"
          css={searchInputWrap}
          placeholder="지역을 검색하세요.(ex. 강남구 삼성동)"
        />
      </div>

      <button css={searchBtnWrap}>
        <LocationSearchingIcon sx={{ fontSize: "24px", color: "#ffffff" }} />
      </button>
    </div>
  );
};

export default Search;

const rootStyle = css`
  position: absolute;
  top: 0;
  width: 100%;
  padding: 16px 18px;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const searchWrap = css`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border: 2px solid #fcac7a;
  border-radius: 8px;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.3);
  padding: 6px 8px;
`;

const searchInputWrap = css`
  background-color: transparent;
  width: 231px;
  border: none;
  outline: none;
  padding-left: 14px;
  ::placeholder {
    color: #88888a;
    font-size: 12px;
  }
  ::focus {
  }
`;

const searchBtnWrap = css`
  padding: 7px 14px;
  background-color: #fcac7a;
  outline: none;
  border: none;
  border-radius: 6px;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  cursor: pointer;
`;
