import React, { Suspense } from 'react';
import { Route as RouteElement } from 'react-router';
import { Navigate, Routes } from 'react-router-dom';
import AuthGuard from './components/AuthGuard';

type Route = {
  Component: React.LazyExoticComponent<() => JSX.Element>;
  path: string;
  isProtected: boolean;
};

const HomePage: React.LazyExoticComponent<() => JSX.Element> = React.lazy(
  () => import('./pages/HomePage'),
);
const CreatePetPage: React.LazyExoticComponent<() => JSX.Element> = React.lazy(
  () => import('./pages/CreatePetPage'),
);
const UpdatePetPage: React.LazyExoticComponent<() => JSX.Element> = React.lazy(
  () => import('./pages/UpdatePetPage'),
);
const PetProfilePage: React.LazyExoticComponent<() => JSX.Element> = React.lazy(
  () => import('./pages/PetProfilePage'),
);
const CreateEventPage: React.LazyExoticComponent<() => JSX.Element> =
  React.lazy(() => import('./pages/CreateEventPage'));
const UpdateEventPage: React.LazyExoticComponent<() => JSX.Element> =
  React.lazy(() => import('./pages/UpdateEventPage'));
// const SignInPage: React.LazyExoticComponent<() => JSX.Element> = React.lazy(
// () => import('./pages/SignInPage'),
// );

const routes: Route[] = [
  {
    path: '/home',
    Component: HomePage,
    isProtected: true,
  },
  {
    path: '/create-event/:petId',
    Component: CreateEventPage,
    isProtected: true,
  },
  {
    path: '/create-pet',
    Component: CreatePetPage,
    isProtected: true,
  },
  {
    path: '/update-pet/:id',
    Component: UpdatePetPage,
    isProtected: true,
  },
  {
    path: '/update-event/:petId/:id',
    Component: UpdateEventPage,
    isProtected: true,
  },
  {
    path: '/pet/:id',
    Component: PetProfilePage,
    isProtected: true,
  },
  // {
  //   path: '/sign-in',
  //   Component: SignInPage,
  //   isProtected: false,
  // },
];

const RoutesLocal = () => {
  return (
    <>
      <Suspense fallback={<></>}>
        <Routes>
          {routes.map(({ path, isProtected, Component }: Route) => {
            return (
              <RouteElement
                key={path}
                path={path}
                element={
                  isProtected ? (
                    <AuthGuard>
                      <Component />
                    </AuthGuard>
                  ) : (
                    <Component />
                  )
                }
              />
            );
          })}
          <RouteElement path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default RoutesLocal;
