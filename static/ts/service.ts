import {Injectable}         from 'angular2/core';
import {Pipe} from 'angular2/core';
import {Http, HTTP_PROVIDERS}   from 'angular2/http';
import {ROUTER_PROVIDERS, RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import  'rxjs/Rx';
import {Logger} from "angular2-logger/core";

import {DynamicRouteConfigurator} from './dynamicRouteConfigurator'

export class User {
    id:number;
    name:string;
    username:string;
    pwd:string;
    avatar:string;
    role:string;
    email:string;
    is_active:boolean;
    date_joined:string;
    last_login:string;
    groups:Array;
}


@Injectable()
export class AppService {
    nav:Array;
    user:User;
    data:{};

    constructor(private http:Http,
                private _router:Router,
                private _logger:Logger) {

// 0.- Level.OFF
// 1.- Level.ERROR
// 2.- Level.WARN
// 3.- Level.INFO
// 4.- Level.DEBUG
// 5.- Level.LOG
        this._logger.level = 5;
        // this._logger.debug('Your debug stuff');
        // this._logger.info('An info');
        // this._logger.warn('Take care ');
        // this._logger.error('Too late !');
        // this._logger.log('log !');
    }

    loglevel() {
        return this._logger.level
    }

    getnav() {
        this.nav = [
            {'id': 'index', 'href': 'Index', 'name': '仪表盘', 'fa': 'fa fa-dashboard', 'children': null},
            {
                'id': 'juser', 'href': 'Index', 'name': '用户管理', 'fa': 'fa fa-group', 'children': [
                {'id': 'usergroup', 'href': 'Index', 'name': '查看用户组'},
                {'id': 'useruser', 'href': 'Index', 'name': '查看用户'},
            ]
            },
            {
                'id': 'jasset', 'href': 'Index', 'name': '资产管理', 'fa': 'fa fa-inbox', 'children': [
                {'id': 'jassetgroup', 'href': 'Index', 'name': '查看资产组'},
                {'id': 'jassetjasset', 'href': 'Index', 'name': '查看资产'},
                {'id': 'jassetcenter', 'href': 'Index', 'name': '查看机房'},
            ]
            },
            {
                'id': 'jperm', 'href': 'Index', 'name': '授权管理', 'fa': 'fa fa-edit', 'children': [
                {'id': 'sudo', 'href': 'Index', 'name': 'Sudo'},
                {'id': 'sysusers', 'href': 'Index', 'name': '系统用户'},
                {'id': 'rules', 'href': 'Index', 'name': '授权规则'},
            ]
            },
            {'id': 'jlog', 'href': 'Index', 'name': '日志审计', 'fa': 'fa fa-files-o', 'children': null},
            {
                'id': 'file', 'href': 'Index', 'name': '上传下载', 'fa': 'fa fa-download', 'children': [
                {'id': 'upload', 'href': 'Index', 'name': '文件上传'},
                {'id': 'download', 'href': 'Index', 'name': '文件下载'},
                {'id': 'setting', 'href': 'Index', 'name': '设置', 'fa': 'fa fa-gears', 'children': []},
            ]
            },
        ];
        return this.nav
    }

    setUser(user:User) {
        this.user = user
    }

    getUser(id:number) {
        this.http.get('/api/userprofile')
            .map(res => res.json())
            .subscribe(
                (data:User)  => {this.data = data},
                err => this._logger.error(err),
                () => {
                    this._logger.log('http get this.data:/api/userprofile');
                    this._logger.debug(this.data);
                    return this.data;
                }
            );

        // return {
        //     'id': 5000,
        //     'name': 'admin',
        //     'username': 'liuzheng',
        //     'pwd': '',
        //     'avatar': 'root.png',
        //     'role': '超级管理员',
        //     'email': 'a@liuzheng.com',
        //     'is_active': true,
        //     'date_joined': '1990',
        //     'last_login': '2016',
        //     'groups': ['group1', 'group2'],
        // }
    }
}


@Pipe({
    name: 'join'
})
export class Join {
    transform(value, args?) {
        return value.join(args)
    }
}

