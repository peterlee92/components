import { useState } from "react";
import { Box, Flex, Label, Checkbox } from "theme-ui";
import { ClickAwayListener } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface ICheckBoxDropdown {
  defaultIds?: number[];
  label: string;
  entities: string;
  id: string;
  onChange: Function;
  sx: object;
  data: Array<any>;
}

const CheckBoxDropdown = (props: ICheckBoxDropdown) => {
  const { sx, defaultIds = [], label, entities, id, onChange, data= [] } = props;

  const [dropdown, setDropdown] = useState('');
  const [ids, setIds] = useState(defaultIds);

  const handleCheckboxClick = (typeId:number) => {
    let array = [...ids];

    if (typeId === 0) {
      array = [];
    } else {
      if (array.includes(typeId)) {
        array = array.filter((arrayId) => arrayId !== typeId);
      } else {
        array.push(typeId);
      }
    }

    onChange(entities, array);
    setIds(array);
  };

  return (
    <Box
      sx={{
        ...sx,
        position: "relative",
        display: "inline-block",
        fontSize: "12px",
      }}
    >
      <Flex
        sx={{
          alignItems: "center",
          cursor: "pointer",
          border: `1px solid ${"some color"}`,
          borderRadius: "5px",
          p: "14px 10px",
          //   color: ,
          span: {
            // color: ,
            ml: "8px",
            minWidth: `66px`,
          },
        }}
        onClick={() => setDropdown(dropdown === entities ? '' : entities)}
      >
        {label}{" "}
        <span>
          {ids.length === 0 || ids.length === data.length
            ? "All"
            : data
                .filter((e) => ids.includes(e[id]))
                .map((o, i) => {
                  return i === 0 ? o.name : ", " + o.name;
                })}
        </span>{" "}
        <KeyboardArrowDownIcon />
      </Flex>

      {dropdown === entities && (
        <ClickAwayListener
          onClickAway={() => {
            setDropdown('');
          }}
        >
          <Box
            sx={{
              position: "absolute",
              zIndex: 10,
              top: "100%",
              width: "100%",
              overflow: "auto",
              background: "#fff",
              boxShadow: "0px 20px 30px rgba(103, 124, 153, 0.2)",
              borderRadius: "5px",
              p: "10px 15px",
              overflowX: "hidden",
              maxHeight: "338px",
            }}
          >
            <Label
              sx={{
                display: "flex",
                alignItems: "center",
                py: "6px",
                svg: {
                  width: "20px",
                  height: "20px",
                },
              }}
            >
              <Checkbox
                checked={ids.length === 0 || ids.length === ids.length}
                onChange={() => handleCheckboxClick(0)}
              />
              All
            </Label>
            {data.map((o) => {
              return (
                <Label
                  key={o[id]}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    py: "6px",
                    svg: {
                      width: "20px",
                      height: "20px",
                    },
                  }}
                >
                  <Checkbox
                    checked={ids.includes(o[id]) || ids.length === data.length}
                    onChange={() => handleCheckboxClick(o[id])}
                  />
                  {o.name}
                </Label>
              );
            })}
          </Box>
        </ClickAwayListener>
      )}
    </Box>
  );
};

export default CheckBoxDropdown;
