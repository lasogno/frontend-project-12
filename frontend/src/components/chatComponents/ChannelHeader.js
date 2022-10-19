import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { getCurrentChannel, getcurrentChannelMessages } from '../../slices/selectors';

const ChannelsHeader = () => {
  const { t } = useTranslation();
  const currentChannel = useSelector((state) => getCurrentChannel(state));
  const channelMessagesCount = useSelector((state) => getcurrentChannelMessages(state)).length;

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0"><b>{`# ${filter.clean(currentChannel.name)}`}</b></p>
      <span className="text-muted">{t('chat.number_of_messages', { count: channelMessagesCount })}</span>
    </div>
  );
};

export default ChannelsHeader;
