import Footer from "../footer";
import { Container } from "@mui/material";
import Navbar from "../navBar";

const Layout = ({ children }: JSX.ElementChildrenAttribute) => {
  return (
    <>
       {/*<Container maxWidth="lg">*/}
        <Navbar />
        <>
        {children}
        </>
        <Footer />
        {/* </Container>*/}
    </>
  );
};

export default Layout;
