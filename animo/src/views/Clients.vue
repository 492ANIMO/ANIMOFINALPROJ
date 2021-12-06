<template>
<div>
    <Navbar/>
    <div style="padding-top:52px">
        <NavbarSide/>
    </div>
    <div class="Content1">
        <div class="Content2">
            <h2><font-awesome-icon class="icon" icon="paw"/>Clients</h2>
            <div class="line"><h3><font-awesome-icon class="icon" icon="search"/>ค้นหา</h3>
              <vs-input v-model="value" placeholder="search..." />
            </div>
                <vs-table striped>
                  <template #thead>
                    <vs-tr>
                      <vs-th>ไอดี</vs-th>
                      <vs-th>ชื่อ-นามสกุล</vs-th>
                      <vs-th>เบอร์โทรศัพท์</vs-th>
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
                      <vs-td>{{ data.name + data.lastname }}</vs-td>
                      <vs-td>{{ data.phone }}</vs-td>
                      <vs-td>ดูข้อมูล</vs-td>
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
  name: 'Dashboard',
  components: {
    Navbar,
    NavbarSide
  },
  data:() => ({
    page : 1,
    users: [
            {
              "id": 1,
              "name": "Leanne Graham",
              "lastname": "Bret",
              "phone": "09-12345678",
            },
            {
              "id": 2,
              "name": "Ervin Howell",
              "lastname": "Antonette",
              "phone": "09-12345678",
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
    text-align: center;
    justify-content: center;
    font-size: 12px;
    padding: 5px;
}
::v-deep .vs-table__tr {
    text-align: center;
    justify-content: center;
    font-size: 12px;
    padding: 5px;
}
</style>