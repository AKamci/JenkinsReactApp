export interface PageProps {
    children?: React.ReactNode;
    fluid?: boolean;
}

export interface HeaderProps {
    children?: React.ReactNode;
    hidden?: boolean;
}

export interface AsideProps {
    children?: React.ReactNode;
    collapsed?: boolean;
}

export interface MainProps {
    children?: React.ReactNode;
    fullPage?: boolean;
}