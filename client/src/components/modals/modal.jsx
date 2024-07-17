const Modal = ({ children, closeCallback }) => {
	const backgroundClick = (e) => {
		e.stopPropagation();
		if (closeCallback) {
			closeCallback();
		}
	};

	return (
		<div
			className="flex items-center content-center flex-wrap justify-center top-0 left-0 w-full z-10 h-full bg-[rgba(0,0,0,0.65)] fixed"
			onClick={backgroundClick}
		>
			{children}
		</div>
	);
};

export default Modal;
