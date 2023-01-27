import { Category } from "@mui/icons-material";
import { Stack } from "@mui/material";
import { categories } from "../utils/constants";

const SideBar = ({selectedCategory,setselectedCategory}) => (
  <Stack
    direction="row"
    sx={{
      overflow: "auto",
      height: { sx: "auto", md: "95%" },
      flexDirection: { md: "column" },
    }}
  >
    {categories.map((Category) => (
      <button
        className="category-btn"
        onClick={()=>setselectedCategory (Category.name)}
        style={{
          background: Category.name === selectedCategory && "#FC1503",
          color: "white",
        }}
        key={Category.name}
      >
        <span style={{ color:Category.name === selectedCategory ? 'white' : 'red',marginRight:'15px' }}>{Category.icon}</span>
        <span style={{ opacity:Category.name === selectedCategory ? '1' : '0.8' }}>{Category.name}</span>
      </button>
    ))}
  </Stack>
);

export default SideBar;
