import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

import { userNotificationsMock } from '@/src/utils';

const NotificationsTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState(1);
  const notifications = userNotificationsMock;

  const selectedClass = 'border-b-2 border-black border-solid';
  const hasStoryNotifications = notifications.stories.find((s) => s.seen === false);
  const hasCommentsNotifications = notifications.comments.find((s) => s.seen === false);

  return (
    <View className="w-full">
      <View className="flex flex-row justify-around w-full">
        <Pressable className=" w-[50%]" onTouchEnd={() => setActiveTab(1)}>
          <View
            className={`${activeTab === 1 ? selectedClass : ''} pb-0.5 flex flex-row justify-center gap-0.25`}>
            <Text className="text-1.25 text-black font-heading">Stories</Text>
            {hasStoryNotifications && (
              <View className="h-0.5 w-0.5 bg-blue rounded-full top-0.125" />
            )}
          </View>
        </Pressable>
        <Pressable className=" w-[50%]" onTouchEnd={() => setActiveTab(2)}>
          <View
            className={`${activeTab === 2 ? selectedClass : ''} pb-0.5 flex flex-row justify-center gap-0.25`}>
            <Text className="text-1.25 text-black text-center font-heading">Comments</Text>
            {hasCommentsNotifications && (
              <View className="h-0.5 w-0.5 bg-blue rounded-full top-0.125" />
            )}
          </View>
        </Pressable>
      </View>

      {activeTab === 1 && <StoriesTabView notifications={notifications.stories} />}
      {activeTab === 2 && <CommentsTabView notifications={notifications.comments} />}
    </View>
  );
};

export default NotificationsTabs;

const StoriesTabView: React.FC<{ notifications: any[] }> = ({ notifications }) => {
  return (
    <View className="flex py-2">
      {notifications.map(({ type, title, author, ammount, date, seen }, index) => {
        let icon, notification;
        switch (type) {
          case 'new-story':
            icon = <Ionicons name="book-outline" size={16} className="top-0.25" />;
            notification = <NewStoryNotification author={author} />;
            break;
          case 'new-reads':
            icon = <Ionicons name="bar-chart-outline" size={16} className="top-0.25" />;
            notification = <NewReadNotification ammount={ammount} />;
            break;
          case 'book-shipped':
            icon = <Ionicons name="boat-outline" size={16} className="top-0.25" />;
            notification = <ShippingNotification date={date} />;
            break;
        }
        return (
          <View
            key={`${title}-${index}`}
            className={`flex flex-row pb-1.25 gap-1 ${seen ? 'opacity-50' : ''}`}>
            {icon}
            <View className="flex gap-0.125">
              <Text className="text-1.25 text-black font-heading tracking-wider">{title}</Text>
              {notification}
            </View>
          </View>
        );
      })}
    </View>
  );
};

const CommentsTabView: React.FC<{ notifications: any[] }> = ({ notifications }) => {
  return (
    <View className="flex py-2">
      {notifications.map(({ type, title, author, ammount, seen }, index) => {
        let icon, notification;
        switch (type) {
          case 'new-comment':
            icon = <Ionicons name="chatbubble-outline" size={16} className="top-0.25" />;
            notification = <NewCommentNotification ammount={ammount} />;
            break;
          case 'new-reply':
            icon = <Ionicons name="chatbubbles-outline" size={16} className="top-0.25" />;
            notification = <NewReplyNotification author={author} />;
            break;
        }
        return (
          <View
            key={`${title}-${index}`}
            className={`flex flex-row pb-1 gap-1 ${seen ? 'opacity-50' : ''}`}>
            {icon}
            <View className="flex gap-0.125">
              <Text className="text-1.25 text-black font-headingbold tracking-wider">{title}</Text>
              {notification}
            </View>
          </View>
        );
      })}
    </View>
  );
};

const NewStoryNotification: React.FC<{ author: string }> = ({ author }) => {
  return (
    <Text>
      <Text className="text-0.875 text-black font-headinglight tracking-wide">new story by </Text>
      <Text className="text-0.875 text-black font-headingbold tracking-wide">{author}</Text>
    </Text>
  );
};

const NewReadNotification: React.FC<{ ammount: number }> = ({ ammount }) => {
  return (
    <Text>
      <Text className="text-0.875 text-black font-headinglight tracking-wide">
        have {ammount} new reads
      </Text>
    </Text>
  );
};

const ShippingNotification: React.FC<{ date: string }> = ({ date }) => {
  return (
    <Text>
      <Text className="text-0.875 text-black font-headinglight tracking-wide">
        was shipped {date}
      </Text>
    </Text>
  );
};

const NewCommentNotification: React.FC<{ ammount: number }> = ({ ammount }) => {
  return (
    <Text>
      <Text className="text-0.875 text-black font-headinglight tracking-wide">
        have {ammount} new comments
      </Text>
    </Text>
  );
};

const NewReplyNotification: React.FC<{ author: string }> = ({ author }) => {
  return (
    <Text>
      <Text className="text-0.875 text-black font-headingbold tracking-wide">{author} </Text>
      <Text className="text-0.875 text-black font-headinglight tracking-wide">replied back</Text>
    </Text>
  );
};
