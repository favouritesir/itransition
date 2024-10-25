import { useEffect } from "react";

// Adding types for props in AppRoutes component
// interface AppRoutesProps {
//   setLoad: React.Dispatch<React.SetStateAction<boolean>>;
// }

export default function AppSkeletons() {
  // setTimeout(() => {
  //   setLoad(true);
  // }, 2000);
  useEffect(() => {
    // axios.get(process.env.REACT_APP_API).then((res) =>
    // {
    //   if (res.data.status === 'success') navigate('/', {state: res.data ||{} });
    //   else navigate('/' + res.data.status);
    // });
  }, []);

  return <>skeletons</>;
}
