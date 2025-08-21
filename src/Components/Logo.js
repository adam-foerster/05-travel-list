import { useEffect } from "react";

export default function Logo({ onLoadFile }) {
	useEffect(() => {
		onLoadFile();
	}, []);
	return <h1> 🌴 Far Away 🧳</h1>;
}
