/* eslint-disable max-len */

import { createSelector } from '@reduxjs/toolkit';
import { selectors as channelsSelectors } from './channelsSlice';
import { selectors as messagesSelectors } from './messagesSlice';

export const getAllChannels = (state) => channelsSelectors.selectAll(state);
export const getAllMessages = (state) => messagesSelectors.selectAll(state);
export const getCurrentChannelId = (state) => state.channels.currentChannelId;
export const getModalChannel = (state) => channelsSelectors.selectById(state, state.modal.channelId);
export const getCurrentChannel = createSelector((state) => state, getCurrentChannelId, (state, currentChannelId) => channelsSelectors.selectById(state, currentChannelId));
export const getcurrentChannelMessages = createSelector([getAllMessages, getCurrentChannelId], (allMessages, currentChannelId) => allMessages.filter(({ channelId }) => channelId === currentChannelId));
