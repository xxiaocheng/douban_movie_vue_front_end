<template>
<div>
    <nav class="navbar is-spaced " role="navigation" aria-label="main navigation"  >
        <div class="navbar-brand">
            <!-- 导航栏左边的选项,总是可见,通常包含logo或者一些其他链接-->
            <a href="/" class="navbar-item"> 
                <!--logo pic -->
                <img src="" width="28" height="28">
            </a>
            <a role="button" class="navbar-burger burger "  aria-label="menu" aria-expanded="false" v-on:click='toggleNav' v-bind:class="{'is-active':isToggleNav}">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>
        <div class="navbar-menu" v-bind:class="{'is-active':isToggleNav}">
            <!--导航栏右边的选项,在移动端隐藏-->
            <div class="navbar-start">
                <!-- 导航栏左边部分-->
                <a href="/home" class="navbar-item">
                    <i class="material-icons">
                        home
                    </i>
                    首页
                </a>
                <a href="/cinema" class="navbar-item">
                    <i class="material-icons">
                        local_movies
                    </i>
                    影讯
                </a>
                <a href="/recommend" class="navbar-item">
                    <i class="material-icons">
                        pan_tool
                    </i>
                    猜你想看
                </a>
                <a href="/explore" class="navbar-item">
                    <i class="material-icons">
                        explore
                    </i>
                    选电影
                </a>
                <a href="/chart" class="navbar-item">
                    <i class="material-icons">
                        line_weight
                    </i>
                    排行榜
                </a>
                <a href="/mine" class="navbar-item">
                    <i class="material-icons">
                        favorite
                    </i>
                    我的电影
                </a>
                <a class="navbar-item" href="/admin" v-if="this.$store.state.isLogin&&this.$store.state.userRole==='admin'">
                    <i class="material-icons">
                        build
                    </i>
                    管理
                </a>
                <div role="search box" class="navbar-item" >
                    <el-autocomplete
                        v-model="state4"
                        :fetch-suggestions="querySearchAsync"
                        placeholder="请输入内容"
                        @select="handleSelect">
                    </el-autocomplete>
                    <el-button type="primary" icon="el-icon-search">搜索</el-button>
                </div>

            </div>
            <div class="navbar-end">
                <!--导航栏末尾-->
                <div class="navbar-item" v-if="!this.$store.state.isLogin">
                    <div class="buttons">
                        <router-link to="/sign" class="button is-primary">
                            <strong>注册</strong>
                        </router-link>
                        <a href="" class="button is-light">
                            登陆
                        </a>
                    </div>
                </div>
                <div role="message buttom" class="navbar-item" v-if="this.$store.state.isLogin" >
                    <el-badge :value="this.$store.state.messageCount" :max='99' class="item">
                        <el-button size="medium">
                            <a href="/">消息</a>
                        </el-button>
                    </el-badge>
                </div>
                <div class="navbar-item">
                    <!--占位-->
                </div>
                <div class="navbar-item has-dropdown is-hoverable" v-if="this.$store.state.isLogin">
                    <!--下拉菜单-->
                    <a href="/account" class="navbar-link ">
                        <i class="material-icons">
                            account_circle
                        </i>
                    </a>
                    <div class="navbar-dropdown is-boxed">
                        <a href="/setting" class="navbar-item">
                        账号管理
                        </a>
                        <hr class="navbar-divider">
                        <a href="/logout" class="navbar-item">
                        注销登录
                        </a>
                    </div>
                </div>
                <div class="navbar-item">
                    <!--占位-->
                </div>

            </div>
        </div>
    </nav>
</div>
</template>

<script>
export default {
    data(){
        return{
            'isToggleNav':false,
            'state4':''
        }
    },
    methods:{
        toggleNav:function(){
            this.isToggleNav=!this.isToggleNav
        },
        changeLogin:function(){
            this.$store.commit('changeLogin')
        },
        querySearchAsync(queryString,cb){
            this.$http
            .get('/search',{
                params:{
                    cate:'movie',
                    q:queryString
                }
            })
            .then(response=>{
                let suggestions=[]
                for (var i=0;i<response.data.items.length;i++){
                    suggestions.push({'value':response.data.items[i].title,'movieId':response.data.items[i].id})
                }
                cb(suggestions)
            })
            .catch(error=>{
                console.log(error)
            })
        },
        handleSelect(item){
            console.log(item.movieId)
        }
    }
    
}
</script>
