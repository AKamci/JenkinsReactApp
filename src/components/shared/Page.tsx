import React from 'react';
import Grid from '@mui/material/Grid2';
import { AsideProps, HeaderProps, MainProps, PageProps } from '../../infrastructure/dtos/PageTypes';

const Page: React.FC<PageProps> & {
    Header: React.FC<HeaderProps>;
    Aside: React.FC<AsideProps>;
    Main: React.FC<MainProps>;
} = ({ children }) => {
    
    return <Grid 
    container>{children}</Grid>;
};

const Header: React.FC<HeaderProps> = ({ children, hidden }) => {
    if (hidden) return null;
    return (
        <Grid size={12}>
            <header>{children}</header>
        </Grid>
    );
};

const Aside: React.FC<AsideProps> = ({ children, collapsed }) => {
    if (collapsed) return null;
    return (
        <Grid size={2}>
            <aside>{children}</aside>
        </Grid>
    );
};

const Main: React.FC<MainProps> = ({ children, fullPage }) => {
    return (
        <Grid size={fullPage ? 12 : 10}>
            <main>{children}</main>
        </Grid>
    );
};

Page.Header = Header;
Page.Aside = Aside;
Page.Main = Main;

export default Page;