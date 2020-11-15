import {
  LogoutOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { LoginLocation } from 'src/modules/login/constants';
import { COLORS } from 'src/theme/colors';
import styled from 'styled-components';

import { SettingsLocation } from '../../modules/settings/constants';
import { LanguageSelector } from './LanguageSelector';

const SideBottomMenu: React.FC<{
  closeDrawer: () => void;
  isLoggedIn: boolean;
  logoutHandler: Function;
}> = ({ closeDrawer, isLoggedIn, logoutHandler }) => {
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <>
      <SideBottomMenuStyle>
        <SideBotomMenuItemStyle>
          <LanguageSelector />
        </SideBotomMenuItemStyle>
        {isLoggedIn && (
          <SideBotomMenuItemStyle
            data-id="settings"
            onClick={() => history.push(SettingsLocation.path)}
          >
            <SettingOutlined />
            {t('menuDrawer.settings')}
          </SideBotomMenuItemStyle>
        )}
        <SideBotomMenuItemStyle
          data-id="contactus"
          role="link"
          onClick={() => {
            closeDrawer();
            window.location.href = 'mailto:info@reach4help.org';
          }}
        >
          <MailOutlined />
          {t('menuDrawer.contactUs')}
        </SideBotomMenuItemStyle>
        {isLoggedIn && (
          <SideBotomMenuItemStyle
            data-id="logout"
            role="link"
            onClick={() => {
              closeDrawer();
              logoutHandler();
            }}
          >
            <LogoutOutlined />
            {t('menuDrawer.logout')}
          </SideBotomMenuItemStyle>
        )}
        {!isLoggedIn && (
          <SideBotomMenuItemStyle
            data-id="login-signup"
            role="link"
            onClick={() => {
              history.push(LoginLocation.path);
            }}
          >
            {t('menuDrawer.login-signup')}
          </SideBotomMenuItemStyle>
        )}
      </SideBottomMenuStyle>
    </>
  );
};

const SideBotomMenuItemStyle = styled('div')`
  color: inherit;
  margin-bottom: 10px;
  padding: 10px;
  cursor: pointer;
  svg {
    margin-right: 10px;
  }
  &:hover,
  &:focus,
  &:active,
  &:focus-within {
    color: white;
    font-weight: 700;
    background-color: ${COLORS.link};
  }
`;
const SideBottomMenuStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px;
  color: inherit;
`;

export default SideBottomMenu;
