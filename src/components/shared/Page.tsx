import React from 'react';

const Page = (props: { children?: React.ReactNode; fluid?: boolean }) => {
	const container = props.fluid ? 'container-fluid' : 'container';
	return (
		<div className={container}>
			<div className='row'>{props.children}</div>
		</div>
	);
};

const Header = (props: { children?: React.ReactNode }) => <div className='col-12'>{props.children}</div>;
Page.Header = Header;

const Aside = (props: { children?: React.ReactNode; collapsed?: boolean }) => {
	const className = props.collapsed ? 'd-none' : 'col-2';
	return <div className={className}>{props.children}</div>;
};
Page.Aside = Aside;

const Main = (props: { children?: React.ReactNode; fullPage?: boolean }) => {
	const grid = props.fullPage ? '12' : '8';
	return <div className={'col-' + grid}>{props.children}</div>;
};
Page.Main = Main;

export default Page;