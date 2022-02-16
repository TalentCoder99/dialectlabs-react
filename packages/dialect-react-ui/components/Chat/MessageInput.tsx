import React, { KeyboardEvent, FormEvent } from 'react';
import { useTheme } from '../common/ThemeProvider';

type PropsType = {
  text: string;
  setText: (text: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onEnterPress: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  disabled: boolean;
};

export default function MessageInput({
  text,
  setText,
  onSubmit,
  onEnterPress,
  disabled,
}: PropsType): JSX.Element {
  const { icons } = useTheme();
  // const { data } = useSWR(
  //   connection && wallet ? ['/owner', wallet, connection] : null,
  //   ownerFetcher
  // );
  // const balance: number | undefined = data?.lamports
  //   ? data.lamports / 1e9
  //   : undefined;
  return (
    <div className="flex flex-col pb-2">
      <form onSubmit={onSubmit}>
        <div className="relative">
          <div className="text-sm break-words py-1 pl-2 pr-11">
            {text || 'h'}
          </div>
          <div className="absolute top-0 w-full h-full flex flex-grow items-center">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={onEnterPress}
              placeholder="Write something"
              className="resize-none h-full w-full text-sm text-gray-800 dark:text-gray-200 bg-black border rounded-md px-2 py-1 border-gray-600 placeholder-gray-600 pr-10"
            />
            <button
              className="absolute inset-y-0 right-0 flex items-center pr-3 disabled:cursor-not-allowed"
              disabled={disabled}
            >
              <icons.arrowsmright
                className={`opacity-100 h-5 w-5 text-black rounded-full bg-white ${
                  disabled ? 'opacity-70' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </form>
      <div className="flex justify-between">
        <div className="flex space-x-3">
          <div className="text-xs pl-1">{text.length}/280</div>
          <div className="text-xs">⊙ {0 || '–'}</div>
        </div>
        {!disabled && (
          <div className="flex text-xs items-center pr-1">
            enter
            <icons.arrownarrowright className="h-4 w-4" />
          </div>
        )}
      </div>
    </div>
  );
}
