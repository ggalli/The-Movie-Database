import classNames from "classnames";
import { ButtonHTMLAttributes, ReactNode } from "react";

import './styles.scss';
import closeIcon from '../../assets/images/close-icon.svg';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
  children?: ReactNode;
};

export function Button({ active, children,  ...props }: ButtonProps) {
  return (
    <button className={classNames(
        'button',
        {active}
      )}
      {...props}
    >
      {children}

      {active && (
        <div className="button__close">
          <img src={closeIcon} alt="botão de remover filtro" />
        </div>  
      )}
    </button>
  )
}