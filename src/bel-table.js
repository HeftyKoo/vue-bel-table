const install = function (Vue, options = {}) {
  if (install.installed) return;
  const tableDefault = options.table || {  // table的默认属性
      data: [],
      maxHeight: 600,
      border: true
    }
  const columnDefault = options.column || { // column的默认属性
      showOverflowTooltip: true,
      headerAlign: 'center',
      resizable: true
    }
  const BelTable = {
    name: 'bel-table',
    data () {
      return {
        defaultAttr: {
          table: tableDefault,
          column: columnDefault
        }
      }
    },
    props: {
      // table的配置,具体见README.md
      configs: {
        type: Object,
        required: true,
        validator (value) {
          return typeof value.columns !== 'undefined' && value.columns.length > 0
        }
      },
      data: Array
    },
    methods: {
      /**
       * 提供element table 的clearSelection方法
       * @param selection
       */
      clearSelection (selection) {
        this.$refs.table.clearSelection(selection)
      },
      /**
       * 提供element table 的toggleRowSelection方法
       * @param row
       * @param selected
       */
      toggleRowSelection (row, selected) {
        this.$refs.table.toggleRowSelection(row, selected)
      },
      /**
       * 转发element table的事件
       * @param action
       * @returns {Function}
       */
      handleEvent (action) {
        const _self = this
        return function () {
          _self.$emit(action, ...arguments)
        }
      }
    },
    render () {
      this.configs.table = this.configs.table || {}
      const tableAttr = Object.assign({}, this.configs.table.default || this.defaultAttr.table, this.configs.table.attr || {}) // 表格属性
      const columns = this.configs.columns  // 列配置
      const columnDefaultAttr = this.configs.columnDefault || this.defaultAttr.column // 列默认配置
      return <el-table ref="table"
                       style={{width: '100%'}}
                       data={this.data ? this.data : tableAttr.data}
                       height={tableAttr.height}
                       max-height={tableAttr.maxHeight}
                       stripe={tableAttr.stripe}
                       border={tableAttr.border}
                       fit={tableAttr.fit}
                       show-header={tableAttr.showHeader}
                       highlight-current-row={tableAttr.highlightCurrent}
                       current-row-key={tableAttr.currentRowKey}
                       row-class-name={tableAttr.rowClassName}
                       row-style={tableAttr.rowStyle}
                       row-key={tableAttr.rowKey}
                       empty-text={tableAttr.emptyText}
                       default-expand-all={tableAttr.defaultExpandAll}
                       expand-row-keys={tableAttr.expandRowKeys}
                       default-sort={tableAttr.defaultSort}
                       tooltip-effect={tableAttr.tooltipEffect}
                       on-select={this.handleEvent('select')}
                       on-select-all={this.handleEvent('select-all')}
                       on-selection-change={this.handleEvent('selection-change')}
                       on-cell-mouse-enter={this.handleEvent('cell-mouse-enter')}
                       on-cell-mouse-leave={this.handleEvent('cell-mouse-leave')}
                       on-cell-click={this.handleEvent('cell-click')}
                       on-cell-dblclick={this.handleEvent('cell-dblclick')}
                       on-row-click={this.handleEvent('row-click')}
                       on-row-contextmenu={this.handleEvent('row-contextmenu')}
                       on-row-dblclick={this.handleEvent('row-dblclick')}
                       on-header-click={this.handleEvent('header-click')}
                       on-sort-change={this.handleEvent('sort-change')}
                       on-filter-change={this.handleEvent('filter-change')}
                       on-current-change={this.handleEvent('current-change')}
                       on-header-dragend={this.handleEvent('header-dragend')}
                       on-expand={this.handleEvent('expand')}
      >
        {
          columns.map((column) => {
            const columnAttr = Object.assign({}, columnDefaultAttr, column.attr)
            return <el-table-column
              type={columnAttr.type}
              column-key={columnAttr.columnKey}
              label={columnAttr.label}
              prop={columnAttr.prop}
              width={columnAttr.width}
              min-width={columnAttr.minWidth}
              fixed={columnAttr.fixed}
              render-header={columnAttr.renderHeader}
              sortable={columnAttr.sortable}
              sort-method={columnAttr.sortMethod}
              resizable={columnAttr.resizable}
              formatter={columnAttr.formatter}
              show-overflow-tooltip={columnAttr.showOverflowTooltip}
              align={columnAttr.align}
              header-align={columnAttr.headerAlign}
              class-name={columnAttr.className}
              label-class-name={columnAttr.labelClassName}
              selectable={columnAttr.selectable}
              reserve-selection={columnAttr.reserveSelection}
              filters={columnAttr.filters}
              filter-multiple={columnAttr.filterMultiple}
              filter-method={columnAttr.filterMethod}
              filtered-value={columnAttr.filterValue}
            >
              {
                columnAttr.scopedSlot ? this.$scopedSlots[columnAttr.scopedSlot] : ''
              }
            </el-table-column>
          })
        }
      </el-table>
    }
  }
  Vue.component(BelTable.name, BelTable)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}


export default {
  install,
}