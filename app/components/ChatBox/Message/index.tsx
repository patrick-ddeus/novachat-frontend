import Image from 'next/image';
import guy from '../../../../public/images/guy.png';
import { MessagesResponse } from '../../../../service/api/messagesApi';

import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

interface IMessageProps {
  userId: number | undefined;
  messages: MessagesResponse[];
}

const Message: React.FC<IMessageProps> = ({ userId, messages }) => {

  return (
    <ul className="p-5 sm:pb-14 max-h-[400px] overflow-auto overflow-x-hidden">
      {messages.map((message) => (
        <li
          key={message.id}
          className={`flex gap-2 mt-6 ${
            message.authorId === userId ? 'justify-end' : ''
          }`}
        >
          {message.authorId !== userId && (
            <Image
              className="w-11 h-11 rounded-full object-contain"
              src={guy}
              alt="guy with background yellow"
            />
          )}
          <div className="flex flex-col gap-2 relative">
            {message.authorId !== userId && (
              <p className="mt-1 font-medium">{message.Author.username}</p>
            )}
            <span
              className={`text-[14px] p-3 ${
                message.authorId === userId ? 'bg-[#20A090]' : 'bg-[#F2F7FB]'
              } rounded-xl ${
                message.authorId === userId
                  ? 'rounded-tr-none text-white'
                  : 'rounded-tl-none'
              }`}
            >
              {message.content}
            </span>
            <span className="absolute -bottom-5 w-6 right-6 text-xs text-[#4a4b4a]">
              {dayjs(message.createdAt).format('HH:mm')}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Message;
