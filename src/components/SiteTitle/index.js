import { Helmet } from "react-helmet-async"

const SiteTitle = ({ title }) => (
  <Helmet>
    <title>{title}</title>
  </Helmet>
)

export default SiteTitle
