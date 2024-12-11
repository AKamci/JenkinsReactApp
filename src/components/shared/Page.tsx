import React from 'react';

const Page = (props: { children?: React.ReactNode; fluid?: boolean }) => {
	const container = props.fluid ? 'container-fluid' : 'container';
	return (
		<div className={container} style={{ position: 'relative' }}>
			<div className='row'>{props.children}</div>
		</div>
	);
};

const Header = (props: { children?: React.ReactNode; hidden?: boolean }) => {
	const style = props.hidden
		? { display: 'none' } 
		: {};
	return (
		<div className='col-12' style={style}>
			{props.children}
		</div>
	);
};
Page.Header = Header;

const Aside = (props: { children?: React.ReactNode; collapsed?: boolean }) => {
	const className = props.collapsed ? 'd-none' : 'col-2';
	return <div className={className} style={{ position: 'fixed', left: 0, top: '64px', bottom: 0, overflowY: 'auto' }}>{props.children}</div>;
};
Page.Aside = Aside;

const Main = (props: { children?: React.ReactNode; fullPage?: boolean }) => {
	const grid = props.fullPage ? '12' : '10';
	return <div className={'col-' + grid} style={{ marginLeft: props.fullPage ? '0' : '16.666667%' }}>{props.children}</div>;
};
Page.Main = Main;

export default Page;