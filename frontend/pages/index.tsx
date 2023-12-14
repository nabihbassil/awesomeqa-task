import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Nav from "./nav";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const IndexPage = () => {
  return (
    <>
    <Nav />
    </>
  );
};

export default IndexPage;
