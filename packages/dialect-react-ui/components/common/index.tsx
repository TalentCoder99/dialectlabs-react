import React from 'react';
import { DialectLogo, Spinner as SpinnerIcon } from '../Icon';
import cs from '../../utils/classNames';
import { useTheme } from './ThemeProvider';

export function Divider(props: { className?: string }): JSX.Element {
  const { divider } = useTheme();

  return <div className={cs(divider, props.className)} />;
}

export function ValueRow(props: {
  label: string;
  children: React.ReactNode;
  highlighted?: boolean;
  className?: string;
}) {
  const { textStyles, highlighted } = useTheme();

  return (
    <p
      className={cs(
        'flex flex-row justify-between',
        props.highlighted && highlighted,
        props.className
      )}
    >
      <span className={cs(textStyles.body)}>{props.label}:</span>
      <span className={cs(textStyles.body)}>{props.children}</span>
    </p>
  );
}

export function Footer(props: { showBackground: boolean }): JSX.Element {
  const { colors } = useTheme();

  return (
    <div
      className={cs(
        'w-40 py-1 inline-flex items-center justify-center absolute bottom-3 left-0 right-0 mx-auto uppercase rounded-full',
        props.showBackground && colors.bg
      )}
      style={{ fontSize: '10px' }}
    >
      Powered by <DialectLogo className="-mr-1 -mt-px" />
    </div>
  );
}

export function Centered(props: { children: React.ReactNode }): JSX.Element {
  const { textStyles } = useTheme();

  return (
    <div
      className={cs(
        'h-full flex flex-col items-center justify-center',
        textStyles.body
      )}
    >
      {props.children}
    </div>
  );
}

export function Loader() {
  const { icons } = useTheme();
  return <icons.spinner className="animate-spin" />;
}

export function Button(props: {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}): JSX.Element {
  const { button, buttonLoading, textStyles, colors } = useTheme();

  return (
    <button
      className={cs(
        'min-w-120 px-4 py-2 rounded-lg transition-all flex flex-row items-center justify-center',
        textStyles.buttonText,
        !props.loading ? button : buttonLoading,
        props.className
      )}
      onClick={props.onClick}
      disabled={props.loading || props.disabled}
    >
      {!props.loading ? props.children : <Loader />}
    </button>
  );
}

export function BigButton(props: {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  loading?: boolean;
  heading: React.ReactNode;
  description: React.ReactNode;
}): JSX.Element {
  const { bigButton, bigButtonLoading, textStyles } = useTheme();

  return (
    <button
      className={cs(
        'w-full px-4 py-3 rounded-lg transition-all',
        !props.loading ? bigButton : bigButtonLoading,
        props.className
      )}
      style={{ borderColor: 'currentColor' }}
      onClick={props.onClick}
      disabled={props.loading || props.disabled}
    >
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col items-start">
          <p className={textStyles.bigButtonText}>{props.heading}</p>
          <p className={textStyles.bigButtonSubtle}>{props.description}</p>
        </div>
        <div>{!props.loading ? props.icon : <Loader />}</div>
      </div>
    </button>
  );
}
