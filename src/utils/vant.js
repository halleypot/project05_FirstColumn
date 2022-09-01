import Vue from 'vue'
import { NavBar, Form, Field, Button, Toast, Tabbar, TabbarItem, Icon, Col, Row, Cell, CellGroup  } from 'vant';
import { Image as VanImage, Dialog, Popup } from 'vant';
import { DatetimePicker } from 'vant';
import { Tab, Tabs } from 'vant';
import { Uploader } from 'vant';
import { List } from 'vant';
import { Grid, GridItem } from 'vant';
import { PullRefresh } from 'vant';
import { Divider } from 'vant';
import { ActionSheet } from 'vant';

Vue.use(ActionSheet);
Vue.use(Divider);
Vue.use(PullRefresh);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(List);
Vue.use(Uploader);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(DatetimePicker);
Vue.use(Popup)
Vue.use(Dialog)
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Col);
Vue.use(Row);
Vue.use(VanImage);
Vue.use(Icon);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Toast);
Vue.use(Button);
Vue.use(Form);
Vue.use(Field);
Vue.use(NavBar);