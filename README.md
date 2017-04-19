# vue-bel-table

[![GitHub issues](https://img.shields.io/github/issues/yeyuqiudeng/vue-bel-table.svg)](https://github.com/yeyuqiudeng/vue-bel-table/issues)
[![GitHub forks](https://img.shields.io/github/forks/yeyuqiudeng/vue-bel-table.svg)](https://github.com/yeyuqiudeng/vue-bel-table/network)
[![GitHub stars](https://img.shields.io/github/stars/yeyuqiudeng/vue-bel-table.svg)](https://github.com/yeyuqiudeng/vue-bel-table/stargazers)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/yeyuqiudeng/vue-bel-table.svg?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=%5Bobject%20Object%5D)

[![NPM](https://nodei.co/npm/vue-bel-table.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/vue-bel-table/)

## Description

A vue table component that base on element ui.Just for using el-table component more convenient。

对element的table组件进行了封装，更方便地使用elment ui的el-table组件

## Installation

```javascript
 npm install vue-bel-table
```

## Usage

```javascript
import BelTable from 'vue-bel-table'
Vue.use(BelTable, options)
```

## Options

```javascript
options: {
    table: Object, // 自定义table默认属性，必须为element ui支持的表格属性
    column: Object // 自定义列默认属性，必须为element ui支持的列属性
}
// 如果不传递，默认属性如下
// 组件内的默认配置如下
	table: {  // table的默认属性
      data: [],
      maxHeight: 600,
      border: true
    },
    column: { // column的默认属性
      showOverflowTooltip: true,
      headerAlign: 'center',
      resizable: true
   }
```

## Props

```javascript
configs: Object
// configs的具体配置如下
configs: {
   table: {  // 表格配置
     default: {}, // 默认配置，配置属性要跟element ui的table attributes 一致，如果有配置，则忽略组件内defaultAttr的table默认配置
     attr: {} // 配置属性要跟element ui的table attributes一致
   },
   columnDefault: {}, // column的默认配置，要跟element ui的column attributes一致，如果有配置，则忽略defaultAttr的column默认配置
   columns: [  // column配置
     {
       attr: {}, // column的默认配置，要跟element的column attributes一致
       scopedSlot: '', // scope slot名称
     }
   ]
 }
```

## events

跟element ui 的 events 一致

## Table Methods

跟element ui 的table methods 一致

## example

```vue
<template>
    <bel-table
      ref="table"
      @row-click="toggleRowSelection"
      :configs="tableConfig">
      <template slot="date" scope="scope">
        <span>{{scope.row.date}}</span>
      </template>
    </bel-table>
</template>

<script type="text/babel">
  export default {
    data () {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    computed: {
      tableConfig: {
        get () {
          return {
            table: {
              attr: {
                data: this.tableData
              }
            },
            columns: [
              {
                attr: {
                  type: 'selection',
                  width: 80,
                  align: 'center'
                }
              },
              {
                attr: {
                  prop: 'date',
                  label: '日期',
                  minWidth: 180,
                  scopedSlot: 'date',
                }
              },
              {
                attr: {
                  prop: 'name',
                  label: '姓名',
                  minWidth: 180
                }
              },
              {
                attr: {
                  prop: 'address',
                  label: '地址',
                  minWidth: 180
                }
              }
            ]
          }
        }
      }
    },
    methods: {
      toggleRowSelection (row) {
        this.$refs.table.toggleRowSelection(row)
      }
    }
  }
</script>

```

