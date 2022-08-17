import { Box, Input, Flex } from "theme-ui";
import { ClickAwayListener } from "@mui/material";

interface ISearchInput {
  onChange: any;
  sx: object;
  data: Array<any>;
  setData: Function;
  placeholder: string;
  value: string;
  handleClickOption: Function;
}

const SearchInput = (props: ISearchInput) => {
  const { sx, placeholder, data, setData, handleClickOption, onChange, value } =
    props;

  return (
    <Box
      sx={{
        ...sx,
        display: "inline-block",
        position: "relative",
      }}
    >
      <Input value={value} onChange={onChange} placeholder={placeholder} />
      {data && data.length > 0 && (
        <ClickAwayListener onClickAway={() => setData([])}>
          <Box
            sx={{
              position: "absolute",
              zIndex: 10,
              top: "100%",
              width: "100%",
              maxHeight: 250,
              overflow: "auto",
              background: "#fff",
              boxShadow: "0px 20px 30px rgba(103, 124, 153, 0.2)",
              borderBottomLeftRadius: "5px",
              borderBottomRightRadius: "5px",
            }}
          >
            {data.map((o, i) => {
              return (
                <Flex
                  key={i}
                  sx={{
                    alignItems: "center",
                    cursor: "pointer",
                    p: "15px 24px",
                    "&:hover": {
                      background: "rgba(254, 85, 0, 0.1)",
                    },
                  }}
                  onClick={() => {
                    handleClickOption(o);
                  }}
                >
                  <span>{o.name}</span> {/* show string value here */}
                </Flex>
              );
            })}
          </Box>
        </ClickAwayListener>
      )}
    </Box>
  );
};

export default SearchInput;
