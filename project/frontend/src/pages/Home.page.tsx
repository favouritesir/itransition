import { useNavigate } from "react-router-dom";
import useApp from "../hooks/useApp.hook";
import { useEffect } from "react";

export default function HomePage({ appLoad }: { appLoad: boolean }) {
  const { user } = useApp();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user?.id) navigate("/auth");
  }, []);
  return (
    <>
      {appLoad && <div className="bg-primary h-fit" />}
      {console.log(appLoad)}
    </>
  );
}
