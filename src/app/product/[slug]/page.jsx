import ProductWrapper from "@/components/wrapper/ProductWrapper";

export default async function ProductPage({ params }) {
  const { slug } = await params;

  return <ProductWrapper slug={slug} />;
}