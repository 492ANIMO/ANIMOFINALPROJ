<template>
<div>
    <Navbar/>
    <div style="padding-top:52px">
        <NavbarSide/>
    </div>
 <div class="Content1">
        <div class="Content2"><div class="BTadd"><font-awesome-icon class="iconBTr" icon="plus"/>เพิ่มข้อมูล</div>
            <h2><font-awesome-icon class="icon" icon="newspaper"/>Annoucement</h2>
            <div class="line"><h3><font-awesome-icon class="icon" icon="search"/>ค้นหา</h3>
              <vs-input v-model="value" placeholder="search..." />
            </div>
                <vs-table striped>
                  <template #thead>
                    <vs-tr>
                      <vs-th>ชื่อหัวข้อ</vs-th>
                      <vs-th>วันที่สร้าง</vs-th>
                      <vs-th>ผู้เขียน</vs-th>
                      <vs-th>จัดการข้อมูล</vs-th>
                    </vs-tr>
                  </template>
                  <template #tbody>
                    <vs-tr
                      :key="i"
                      v-for="(data, i) in users"
                      :data="data"
                    >
                      <vs-td>{{ data.id }}</vs-td>
                      <vs-td>{{ data.name }}</vs-td>
                      <vs-td>{{ data.phone }}</vs-td>
                      <vs-td><div class="BT">ดูข้อมูล<font-awesome-icon class="iconBTl" icon="info-circle" style="font-size: 10px;"/></div></vs-td>
                    </vs-tr>
                  </template>
                </vs-table>
                <div class="center">
                  <vs-pagination infinite v-model="page" :length="10" />
                </div>
            </div>
    </div>
</div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import NavbarSide from '@/components/NavbarSide.vue'

export default {
  name: 'Annoucement',
  components: {
    Navbar,
    NavbarSide
  },
  data:() => ({
    page : 1,
    users: [
            {
              "id": 1,
              "name": "1/1/2022",
              "phone": "Staff",
            },
            {
              "id": 2,
              "name": "1/1/2022",
              "phone": "Staff",
            },
            {
              "id": 3,
              "name": "1/1/2022",
              "phone": "Staff",
            },
            {
              "id": 4,
              "name": "1/1/2022",
              "phone": "Staff",
            }
        ]
    })
}
</script>
<style scoped>
h2{
  margin: 0px 0px 5px 0px;
  color: #696969;
  font-weight: 500;
}
h3{
  margin: 0px;
  color: #adadad;
  font-weight: 500;
  margin-left: 30px;
}
.line {
  display: flex;
  padding-bottom: 20px;
}
.BT{
  background: rgb(94,184,204);
  background: linear-gradient(45deg, rgba(94,184,204,1) 0%, rgba(68,157,222,1) 100%);
  display: inline-block;
  padding: 5px 15px;
  color: #ffffff;
  border-radius: 20px;
}
.BTadd{
  background: rgb(108,172,208);
  background: linear-gradient(45deg, rgba(108,172,208,1) 0%, rgba(118,147,196,1) 100%);
  display: inline-block;
  padding: 4px 13px;
  color: #ffffff;
  border-radius: 20px;
  font-size: 14px;
  float: right;
  margin-top: 5px;
}
.iconBTr{
  padding-right: 5px;
  margin-left: -3px;
}
.iconBTl{
  padding-left: 5px;
  margin-right: -3px;
  }
::v-deep .vs-input {
  width: 350px;
  height: 35px;
}
::v-deep .vs-input-content {
  width: 350px;
  margin-left: 10px;
  margin-top: -2px;
}
::v-deep .vs-pagination-content {
  padding-top: 20px;
}
::v-deep .vs-pagination__active {
  background: #3acad2;
  box-shadow: none;
  margin-top: 20px;
}
::v-deep .vs-table__th__content {
    color: #696969;
    text-align: center;
    justify-content: center;
    font-size:15px;
    padding: 5px;
}
::v-deep .vs-table__tr {
    color: #696969;
    text-align: center;
    justify-content: center;
    font-size: 13px;
    padding: 5px;
}
::v-deep .vs-table__td {
  padding: 5px 12px;
}
</style>