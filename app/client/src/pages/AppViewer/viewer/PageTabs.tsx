import React, { useRef, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import {
  ApplicationPayload,
  PageListPayload,
} from "constants/ReduxActionConstants";
import { PLACEHOLDER_APP_SLUG, PLACEHOLDER_PAGE_SLUG } from "constants/routes";
import { isEllipsisActive } from "utils/helpers";
import TooltipComponent from "components/ads/Tooltip";
import { getTypographyByKey } from "constants/DefaultTheme";
import { Position } from "@blueprintjs/core";

import { getAppMode } from "selectors/applicationSelectors";
import { useSelector } from "react-redux";

import { trimQueryString } from "utils/helpers";
import { getPageURL } from "utils/AppsmithUtils";
import { viewerURL } from "RouteBuilder";

const PageTab = styled(NavLink)`
  display: flex;
  max-width: 170px;
  align-self: flex-end;
  cursor: pointer;
  text-decoration: none;
  padding: 0px ${(props) => props.theme.spaces[7]}px;
  &:hover {
    text-decoration: none;
  }
`;

const StyledBottomBorder = styled.div`
  position: relative;
  transition: all 0.3s ease-in-out;
  height: 2px;
  width: 100%;
  left: -100%;
  top: 9px;
  background-color: ${(props) =>
    props.theme.colors.header.activeTabBorderBottom};
  ${PageTab}:hover & {
    position: relative;
    width: 100%;
    left: 0;
  }
`;

const StyleTabText = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${(props) => getTypographyByKey(props, "h6")}
  color: ${(props) => props.theme.colors.header.tabText};
  height: ${(props) => `calc(${props.theme.smallHeaderHeight})`};
  & span {
    height: 100%;
    max-width: 138px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: flex;
    align-items: center;
  }
  ${PageTab}.is-active & {
    color: ${(props) => props.theme.colors.header.activeTabText};
    ${StyledBottomBorder} {
      left: 0;
    }
  }
`;

function PageTabName({ name }: { name: string }) {
  const tabNameRef = useRef<HTMLSpanElement>(null);
  const [ellipsisActive, setEllipsisActive] = useState(false);
  const tabNameText = (
    <StyleTabText>
      <div className="relative flex ">
        <div className="relative flex items-center justify-center flex-grow">
          <span ref={tabNameRef}>{name}</span>
        </div>
        {ellipsisActive && "..."}
      </div>
      <StyledBottomBorder />
    </StyleTabText>
  );

  useEffect(() => {
    if (isEllipsisActive(tabNameRef?.current)) {
      setEllipsisActive(true);
    }
  }, [tabNameRef]);

  return (
    <TooltipComponent
      boundary="viewport"
      content={name}
      disabled={!ellipsisActive}
      maxWidth="400px"
      position={Position.BOTTOM}
    >
      {tabNameText}
    </TooltipComponent>
  );
}

function PageTabContainer({
  children,
  isTabActive,
  setShowScrollArrows,
  tabsScrollable,
}: {
  children: React.ReactNode;
  isTabActive: boolean;
  tabsScrollable: boolean;
  setShowScrollArrows: () => void;
}) {
  const tabContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isTabActive) {
      tabContainerRef.current?.scrollIntoView(false);
      setShowScrollArrows();
    }
  }, [isTabActive, tabsScrollable]);

  return <div ref={tabContainerRef}>{children}</div>;
}

type Props = {
  currentApplicationDetails?: ApplicationPayload;
  appPages: PageListPayload;
  measuredTabsRef: (ref: HTMLElement | null) => void;
  tabsScrollable: boolean;
  setShowScrollArrows: () => void;
};

export function PageTabs(props: Props) {
  const { appPages, currentApplicationDetails } = props;
  const location = useLocation();
  const { pathname } = location;
  const appMode = useSelector(getAppMode);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setQuery(window.location.search);
  }, [location]);

  return (
    <div
      className="flex w-full overflow-auto scrollbar-none"
      ref={props.measuredTabsRef}
    >
      {appPages.map((page) => (
        <PageTabContainer
          isTabActive={
            pathname ===
            trimQueryString(
              viewerURL({
                applicationSlug:
                  currentApplicationDetails?.slug || PLACEHOLDER_APP_SLUG,
                pageSlug: page.slug || PLACEHOLDER_PAGE_SLUG,
                pageId: page.pageId,
              }),
            )
          }
          key={page.pageId}
          setShowScrollArrows={props.setShowScrollArrows}
          tabsScrollable={props.tabsScrollable}
        >
          <PageTab
            activeClassName="is-active"
            className="t--page-switch-tab"
            to={{
              pathname: getPageURL(page, appMode, currentApplicationDetails),
              search: query,
            }}
          >
            <PageTabName name={page.pageName} />
          </PageTab>
        </PageTabContainer>
      ))}
    </div>
  );
}

export default PageTabs;
