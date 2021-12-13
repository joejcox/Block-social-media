import { Helmet } from "react-helmet-async"

type Title = {
  title: string
}

const SiteTitle = ({ title }: Title) => (
  <Helmet>
    <title>{title}</title>
  </Helmet>
)

export default SiteTitle
