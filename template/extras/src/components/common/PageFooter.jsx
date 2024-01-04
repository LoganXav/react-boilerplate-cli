import Logo from "common/Logo"
import { NavLink } from "react-router-dom"
// import { ReactComponent as InstagramSvg } from "assets/svgs/instagram.svg";
// import { ReactComponent as FacebookSvg } from "assets/svgs/facebook.svg";
// import { ReactComponent as LinkedInSvg } from "assets/svgs/linkedin.svg";
import { Container, Typography, Link as MuiLink } from "@mui/material"
import clsx from "clsx"
import "./PageFooter.css"
import { RouteEnum } from "constants/RouterConstants"

function PageFooter() {
  return (
    <div className={clsx("PageFooter")}>
      <Container className="pt-14 pb-4">
        <div className="mb-8 flex flex-wrap gap-x-24 md:gap-x-14 gap-y-8">
          <div className="w-full" style={{ maxWidth: 400 }}>
            <Logo className="mb-4" />
            {/* <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis
              ipsum eu sed ut lacinia elementum mauris.
            </p>
            <div className="flex space-x-4 items-center">
              <InstagramSvg />
              <FacebookSvg />
              <LinkedInSvg />
            </div> */}
          </div>
          {GROUP_LINKS.map((group, key) => (
            <div key={key}>
              <Typography className="mb-6 font-bold">{group.name}</Typography>
              {group.links.map((link, key) => (
                <div key={key} className="mb-4">
                  <MuiLink component={NavLink} color="inherit" {...link} />
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 justify-between items-center pt-4 border-t">
          <Typography variant="caption">
            Copyright © 2022 Simplify. All Rights Reserved.
          </Typography>
          {/* <div className="flex space-x-4 items-center text-secondary-main">
            {[
              { SvgIcon: FacebookSvg, to: "https://www.facebook.com/" },
              { SvgIcon: InstagramSvg, to: "https://www.instagram.com/" },
              { SvgIcon: LinkedInSvg, to: "https://www.linkedin.com/" },
            ].map(({ SvgIcon, to }) => (
              <a key={to} href={to} target="_blank" rel="noreferrer">
                <SvgIcon fill="currentColor" />
              </a>
            ))}
          </div> */}
          {/* <div className="flex gap-4">
            {[
              { children: "Terms and Condition", to: "/" },
              { children: "Policy", to: "/" },
              { children: "Privacy", to: "/" },
            ].map((link, key) => (
              <NavLink key={key} {...link} />
            ))}
          </div> */}
        </div>
      </Container>
    </div>
  )
}

export default PageFooter

const GROUP_LINKS = [
  {
    name: "Company",
    links: [
      { children: "About", to: RouteEnum.ABOUT },
      { children: "Solution", to: RouteEnum.SOLUTIONS },
      { children: "Contact Us", to: RouteEnum.CONTACT },
    ],
  },
  {
    name: "Customer",
    links: [
      { children: "Login", to: RouteEnum.SIGNIN },
      { children: "Sign Up", to: RouteEnum.SIGNUP },
    ],
  },
]
