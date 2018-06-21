/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

'use strict';

import { IMenubarService, IMenubarData } from 'vs/platform/menubar/common/menubar';
import { Menubar } from 'vs/code/electron-main/menubar';
import { ILogService } from 'vs/platform/log/common/log';
import { TPromise } from 'vs/base/common/winjs.base';
import { IInstantiationService } from 'vs/platform/instantiation/common/instantiation';
import { isMacintosh, isWindows } from 'vs/base/common/platform';

export class MenubarService implements IMenubarService {
	_serviceBrand: any;

	private _menubar: Menubar;

	constructor(
		@IInstantiationService private instantiationService: IInstantiationService,
		@ILogService private logService: ILogService
	) {
		// Install Menu
		// TODO@sbatten: Remove if block
		if (isMacintosh && isWindows) {
			this._menubar = this.instantiationService.createInstance(Menubar);
		}
	}

	updateMenubar(windowId: number, menus: IMenubarData): TPromise<void> {
		this.logService.trace('menubarService#updateMenubar', windowId);

		if (this._menubar) {
			this._menubar.updateMenu(menus, windowId);
		}

		return TPromise.as(null);
	}
}