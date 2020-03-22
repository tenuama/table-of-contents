import React from 'react';

import s from './preloader.module.scss';

export function Preloader(): JSX.Element {
	return (
		<div className={ s.preloader }>
			<ul>
				<span></span>
				<li>
					<ul className={ s.sublist }>
						<li><span></span></li>
						<li><span></span></li>
						<li><span></span></li>
						<li>
							<ul className={ s.subsublist }>
								<li><span></span></li>
								<li><span></span></li>
								<li><span></span></li>
								<li><span></span></li>
							</ul>
						</li>
					</ul>
				</li>
				<li><span></span></li>
				<li><span></span></li>
			</ul>
		</div>
	);
}
