import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { IconType } from 'react-icons';
import { useRouter } from 'next/router';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import logo from 'public/assets/logo-image.png';
import Button from '../../Button/Button';
import { routes } from './routes';
import { clearAlert, logoutUser } from '@alergiesmanagement/store';

const Sidebar = () => {
  const router = useRouter();
  const dispatch = useDispatch() as any;
  const isActive = (route: string) => {
    if (route === router.pathname) {
      return true;
    }
    return false;
  };
  return (
    <div
      className="w-1/5 bg-white shadow-xl border-r-[1px] max-h-screen min-h-screen px-6 py-6 flex flex-col fixed"
      id="Sidebar"
    >
      <div className="max-w-[10rem]">
        <Image alt="logo" className="" src={logo} />
      </div>
      <div className="mt-8">
        <p className="text-gray-500 font-poppins uppercase">Navigation</p>
        <div className="pt-5 space-y-4">
          {routes.map((route, id) => {
            const Icon = route.icon as IconType;
            return (
              <div
                key={id}
                id={`${route.name.replace(' ', '')}_${id}`}
                className={`flex items-center space-x-2 cursor-pointer ${
                  isActive(route.path)
                    ? 'text-blue-500 hover:text-blue-400'
                    : 'text-gray-500 hover:text-blue-500'
                }`}
                onClick={() => router.push(route.path)}
              >
                <Icon />
                <span className="font-poppins font-normal">{route.name}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-auto">
        <Button
          title="Logout"
          varient="secondary"
          onClick={() => {
            dispatch(logoutUser());
            dispatch(clearAlert());
            router.push('/login');
          }}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default Sidebar;
