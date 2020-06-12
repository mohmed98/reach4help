import { MailOutlined } from '@ant-design/icons';
import { List, Modal, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import r4hLOVE from 'src/assets/r4hLOVE.png';
import { StepBackButton, StepForwardButton } from 'src/components/Buttons';
import { COLORS } from 'src/theme/colors';
import styled from 'styled-components';

const SEEN = 'seen';

const R4HloveListItem = styled(List.Item)`
  display: flex;
`;

export const InformationModal: React.FC<InformationModalProps> = ({
  finishRequestHandler,
  title = 'Instructions',
  instructions,
  localStorageKey,
}) => {
  const { t } = useTranslation();

  const [requestModalVisible, setRequestModalVisible] = useState<boolean>(
    false,
  );

  useEffect(() => {
    const key = window.localStorage.getItem(localStorageKey);

    if (!key || key !== SEEN) {
      setRequestModalVisible(true);
      window.localStorage.setItem(localStorageKey, SEEN);
    } else {
      setRequestModalVisible(false);
    }
  }, [localStorageKey]);

  const onFinishRequest = (): void => {
    finishRequestHandler && finishRequestHandler();
    setRequestModalVisible(false);
  };

  const ModalHeader = header => <h2>{header}</h2>;

  const ModalFooter = () => (
    <div>
      <a href="mailto:info@reach4help.org">
        <em
          style={{
            color: COLORS.lightBlue,
          }}
        >
          {t('information_modal.footer')}
        </em>
        &nbsp;&nbsp;&nbsp;
        <MailOutlined
          style={{
            color: COLORS.lightBlue,
          }}
        />
      </a>
    </div>
  );

  return (
    <Modal
      visible={requestModalVisible}
      onCancel={(): void => setRequestModalVisible(false)}
      footer={null}
    >
      <List
        header={ModalHeader(title)}
        footer={ModalFooter()}
        bordered
        dataSource={instructions}
        renderItem={item => (
          <R4HloveListItem>
            <img
              alt={t('information_modal.a11y_logo')}
              height="18px"
              width="18px"
              src={r4hLOVE}
            />{' '}
            <Typography.Text>{item}</Typography.Text>
          </R4HloveListItem>
        )}
      />

      <div style={{ display: 'flex' }}>
        <StepBackButton onClick={() => setRequestModalVisible(false)}>
          {t('cancel')}
        </StepBackButton>
        <StepForwardButton onClick={onFinishRequest}>
          {t('okay')}
        </StepForwardButton>
      </div>
    </Modal>
  );
};

interface InformationModalProps {
  title?: string;
  instructions?: string[];
  localStorageKey: string;
  finishRequestHandler?: () => void;
}
