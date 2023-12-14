import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Image from 'next/image';
import Button from "@mui/material/Button";
import CompLogo from '../../public/CompLogo.svg'; // replace with your image path
import { Link } from "@mui/material";
import React from "react";
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const Navbar = () => {
    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: '#2F343A' }}>
                <Toolbar>
                    <Link href="/">
                        <IconButton
                            size="small"
                            edge="start"
                            color="inherit"
                            aria-label="logo"
                            sx={{ '&:hover': { backgroundColor: 'transparent' } }}
                        >
                            <Image src={CompLogo} alt="Company Logo" />
                        </IconButton>
                    </Link>
                    <Link href="/" sx={{ flexGrow: 1, color: '#FFFFFF', '&:hover': { backgroundColor: 'transparent' }, textDecoration: "none" }}>
                        <Typography variant="h6" component="div">
                            AwesomeQA
                        </Typography>
                    </Link>
                    <Stack direction="row" spacing={2}>
                        <Link href="/" sx={{ textDecoration: "none", color: "inherit" }}>
                            <Button color="inherit" sx={{ '&:hover': { backgroundColor: 'rgba(93, 80, 195, 0.7)' } }}>
                                Home
                            </Button>
                        </Link>
                        <Link href="/falsePage" sx={{ textDecoration: "none", color: "inherit" }}>
                            <Button color="inherit" sx={{ '&:hover': { backgroundColor: 'rgba(93, 80, 195, 0.7)' } }}>
                                Knowledge Base
                            </Button>
                        </Link>
                        <Link href="/tickets" sx={{ textDecoration: "none", color: "inherit" }}>
                            <Button color="inherit" sx={{ '&:hover': { backgroundColor: 'rgba(93, 80, 195, 0.7)' } }}>
                                Tickets
                            </Button>
                        </Link>
                        <Link href="/falsePage" sx={{ textDecoration: "none", color: "inherit" }}>
                            <Button color="inherit" sx={{ '&:hover': { backgroundColor: 'rgba(93, 80, 195, 0.7)' } }}>
                                FAQ Insights
                            </Button>
                        </Link>
                    </Stack>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Navbar;