"use client";

import React from "react";
import { Container, Grid, Typography, Link, Box } from "@mui/material";
import { motion } from "framer-motion";
import { lineSupport } from "@/globals/buttonActionPath";

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <Container maxWidth="lg" className="py-10">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" className="mb-4 font-bold">
              Company
            </Typography>
            <ul>
             
              <li>
                <Link href="/service" color="inherit" className="hover:text-gray-400">
                  Contact
                </Link>
              </li>
            </ul>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" className="mb-4 font-bold">
              Services
            </Typography>
            <ul>
              <li>
                <Link href="/topup" color="inherit" className="hover:text-gray-400">
                  Internet
                </Link>
              </li>
              <li>
                <Link href="/broadband" color="inherit" className="hover:text-gray-400">
                  Wifi
                </Link>
              </li>
              <li>
                <Link href="/wEnergy" color="inherit" className="hover:text-gray-400">
                  SolarCell
                </Link>
              </li>
            </ul>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" className="mb-4 font-bold">
              Support
            </Typography>
            <ul>
              <li>
                <Link href={lineSupport} color="inherit" className="hover:text-gray-400">
                  Help Center
                </Link>
              </li>
             
            </ul>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" className="mb-4 font-bold">
              Follow Us
            </Typography>
            <Box className="flex space-x-4">
              <Box className="flex items-center space-x-2">
                <motion.img
                  src="/assets/etc/lineScanAddFriend.webp"
                  alt=""
                  className="w-12 h-12"
                />
                <Typography
                  fontFamily={"Prompt"}
                  variant="body1"
                  color="#ffffff"
                >
                  ไลน์ไอดี: @341tmfte
                </Typography>
              </Box>
              <Box >
                <Typography
                  fontFamily={"Prompt"}
                  variant="body1"
                  color="#ffffff"
                >
                  เบอร์โทรฝ่ายขาย
                </Typography>
                <Typography
                  fontFamily={"Prompt"}
                  variant="body2"
                  color="#ffffff"
                >
                  0910192552
                </Typography>
                <Typography
                  fontFamily={"Prompt"}
                  variant="body2"
                  color="#ffffff"
                >
                  0902518964
                </Typography>
                <Typography
                  fontFamily={"Prompt"}
                  variant="body2"
                  color="#ffffff"
                >
                  0841041506
                </Typography>
              </Box>
              <Box></Box>
            </Box>
          </Grid>
        </Grid>
        <Box className="mt-8 border-t border-gray-700 pt-4 text-center">
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} Telemart Communication co.,ltd.
            copyright all. right reserved reserved.
          </Typography>
        </Box>
      </Container>
    </footer>
  );
};

export default Footer;
