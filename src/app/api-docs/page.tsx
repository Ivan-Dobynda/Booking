'use client';
import dynamic from 'next/dynamic';

const Swagger = dynamic(
  () => import('@/Component/swaggerui'),
  { ssr: false }
);

const ApiDocs = () => {
  return <Swagger />;
};

export default ApiDocs;