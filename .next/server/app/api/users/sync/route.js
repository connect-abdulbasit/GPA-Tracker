/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/users/sync/route";
exports.ids = ["app/api/users/sync/route"];
exports.modules = {

/***/ "(rsc)/./app/api/users/sync/route.ts":
/*!*************************************!*\
  !*** ./app/api/users/sync/route.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_database__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/database */ \"(rsc)/./lib/database.ts\");\n/* harmony import */ var _clerk_nextjs_server__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @clerk/nextjs/server */ \"(rsc)/./node_modules/@clerk/nextjs/dist/esm/app-router/server/auth.js\");\n\n\n\nasync function POST(request) {\n    try {\n        const { userId } = await (0,_clerk_nextjs_server__WEBPACK_IMPORTED_MODULE_2__.auth)();\n        if (!userId) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Unauthorized'\n            }, {\n                status: 401\n            });\n        }\n        const body = await request.json();\n        const result = await _lib_database__WEBPACK_IMPORTED_MODULE_1__.DatabaseManager.createUser(body.user);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true,\n            user: result\n        });\n    } catch (error) {\n        console.error('Error syncing user:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Failed to sync user'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3VzZXJzL3N5bmMvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUEwQztBQUNNO0FBQ0w7QUFFcEMsZUFBZUcsS0FBS0MsT0FBZ0I7SUFDekMsSUFBSTtRQUNGLE1BQU0sRUFBRUMsTUFBTSxFQUFFLEdBQUcsTUFBTUgsMERBQUlBO1FBRTdCLElBQUksQ0FBQ0csUUFBUTtZQUNYLE9BQU9MLHFEQUFZQSxDQUFDTSxJQUFJLENBQUM7Z0JBQUVDLE9BQU87WUFBZSxHQUFHO2dCQUFFQyxRQUFRO1lBQUk7UUFDcEU7UUFFQSxNQUFNQyxPQUFPLE1BQU1MLFFBQVFFLElBQUk7UUFDL0IsTUFBTUksU0FBUyxNQUFNVCwwREFBZUEsQ0FBQ1UsVUFBVSxDQUFDRixLQUFLRyxJQUFJO1FBRXpELE9BQU9aLHFEQUFZQSxDQUFDTSxJQUFJLENBQUM7WUFBRU8sU0FBUztZQUFNRCxNQUFNRjtRQUFPO0lBQ3pELEVBQUUsT0FBT0gsT0FBTztRQUNkTyxRQUFRUCxLQUFLLENBQUMsdUJBQXVCQTtRQUNyQyxPQUFPUCxxREFBWUEsQ0FBQ00sSUFBSSxDQUN0QjtZQUFFQyxPQUFPO1FBQXNCLEdBQy9CO1lBQUVDLFFBQVE7UUFBSTtJQUVsQjtBQUNGIiwic291cmNlcyI6WyIvaG9tZS9iYXNpdC9wZXJzb25hbC9HUEEtQ2FsY3VsYXRvci9hcHAvYXBpL3VzZXJzL3N5bmMvcm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInXG5pbXBvcnQgeyBEYXRhYmFzZU1hbmFnZXIgfSBmcm9tICdAL2xpYi9kYXRhYmFzZSdcbmltcG9ydCB7IGF1dGggfSBmcm9tICdAY2xlcmsvbmV4dGpzL3NlcnZlcidcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxdWVzdDogUmVxdWVzdCkge1xuICB0cnkge1xuICAgIGNvbnN0IHsgdXNlcklkIH0gPSBhd2FpdCBhdXRoKClcbiAgICBcbiAgICBpZiAoIXVzZXJJZCkge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdVbmF1dGhvcml6ZWQnIH0sIHsgc3RhdHVzOiA0MDEgfSlcbiAgICB9XG5cbiAgICBjb25zdCBib2R5ID0gYXdhaXQgcmVxdWVzdC5qc29uKClcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBEYXRhYmFzZU1hbmFnZXIuY3JlYXRlVXNlcihib2R5LnVzZXIpXG4gICAgXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgdXNlcjogcmVzdWx0IH0pXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignRXJyb3Igc3luY2luZyB1c2VyOicsIGVycm9yKVxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgIHsgZXJyb3I6ICdGYWlsZWQgdG8gc3luYyB1c2VyJyB9LCBcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxuICAgIClcbiAgfVxufSAiXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiRGF0YWJhc2VNYW5hZ2VyIiwiYXV0aCIsIlBPU1QiLCJyZXF1ZXN0IiwidXNlcklkIiwianNvbiIsImVycm9yIiwic3RhdHVzIiwiYm9keSIsInJlc3VsdCIsImNyZWF0ZVVzZXIiLCJ1c2VyIiwic3VjY2VzcyIsImNvbnNvbGUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/users/sync/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/database.ts":
/*!*************************!*\
  !*** ./lib/database.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DatabaseManager: () => (/* binding */ DatabaseManager)\n/* harmony export */ });\n/* harmony import */ var _src_db_schema__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/src/db/schema */ \"(rsc)/./src/db/schema.ts\");\n/* harmony import */ var _supabase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./supabase */ \"(rsc)/./lib/supabase.ts\");\n/* harmony import */ var drizzle_orm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! drizzle-orm */ \"(rsc)/./node_modules/drizzle-orm/sql/expressions/conditions.js\");\n/* harmony import */ var _src_db__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/src/db */ \"(rsc)/./src/db/index.ts\");\n\n\n// import { db } from '@/src/db'\n\n\nclass DatabaseManager {\n    static async createUser(clerkUser) {\n        try {\n            const email = clerkUser.emailAddresses[0]?.emailAddress || '';\n            console.log(email);\n            // Check if user with email already exists\n            const existingUser = await _src_db__WEBPACK_IMPORTED_MODULE_2__.db.select().from(_src_db_schema__WEBPACK_IMPORTED_MODULE_0__.usersTable).where((0,drizzle_orm__WEBPACK_IMPORTED_MODULE_3__.eq)(_src_db_schema__WEBPACK_IMPORTED_MODULE_0__.usersTable.email, email));\n            console.log(existingUser);\n            if (existingUser.length > 0) {\n                return existingUser[0];\n            }\n            const userData = {\n                id: clerkUser.id,\n                email: email,\n                first_name: clerkUser.firstName || null,\n                last_name: clerkUser.lastName || null,\n                full_name: clerkUser.fullName || null,\n                image_url: clerkUser.imageUrl || null\n            };\n            const user = await _src_db__WEBPACK_IMPORTED_MODULE_2__.db.insert(_src_db_schema__WEBPACK_IMPORTED_MODULE_0__.usersTable).values(userData).returning();\n            return user[0];\n        } catch (error) {\n            console.error('Error creating/updating user:', error);\n            return null;\n        }\n    }\n    static async getUser(userId) {\n        try {\n            const { data, error } = await _supabase__WEBPACK_IMPORTED_MODULE_1__.supabase.from('users').select('*').eq('id', userId).single();\n            if (error) throw error;\n            return data;\n        } catch (error) {\n            console.error('Error fetching user:', error);\n            return null;\n        }\n    }\n    static async updateUser(userId, updates) {\n        try {\n            const { data, error } = await _supabase__WEBPACK_IMPORTED_MODULE_1__.supabase.from('users').update(updates).eq('id', userId).select().single();\n            if (error) throw error;\n            return data;\n        } catch (error) {\n            console.error('Error updating user:', error);\n            return null;\n        }\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZGF0YWJhc2UudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBNEM7QUFDUDtBQUNyQyxnQ0FBZ0M7QUFDQTtBQUNIO0FBYXRCLE1BQU1JO0lBQ1gsYUFBYUMsV0FBV0MsU0FTdkIsRUFBZ0M7UUFDL0IsSUFBSTtZQUNGLE1BQU1DLFFBQVFELFVBQVVFLGNBQWMsQ0FBQyxFQUFFLEVBQUVDLGdCQUFnQjtZQUMzREMsUUFBUUMsR0FBRyxDQUFDSjtZQUNaLDBDQUEwQztZQUMxQyxNQUFNSyxlQUFlLE1BQU1ULHVDQUFFQSxDQUFDVSxNQUFNLEdBQUdDLElBQUksQ0FBQ2Qsc0RBQVVBLEVBQUVlLEtBQUssQ0FBQ2IsK0NBQUVBLENBQUNGLHNEQUFVQSxDQUFDTyxLQUFLLEVBQUVBO1lBQ25GRyxRQUFRQyxHQUFHLENBQUNDO1lBQ1osSUFBSUEsYUFBYUksTUFBTSxHQUFHLEdBQUc7Z0JBQzNCLE9BQU9KLFlBQVksQ0FBQyxFQUFFO1lBQ3hCO1lBRUEsTUFBTUssV0FBVztnQkFDZkMsSUFBSVosVUFBVVksRUFBRTtnQkFDaEJYLE9BQU9BO2dCQUNQWSxZQUFZYixVQUFVYyxTQUFTLElBQUk7Z0JBQ25DQyxXQUFXZixVQUFVZ0IsUUFBUSxJQUFJO2dCQUNqQ0MsV0FBV2pCLFVBQVVrQixRQUFRLElBQUk7Z0JBQ2pDQyxXQUFXbkIsVUFBVW9CLFFBQVEsSUFBSTtZQUNuQztZQUVBLE1BQU1DLE9BQU8sTUFBTXhCLHVDQUFFQSxDQUFDeUIsTUFBTSxDQUFDNUIsc0RBQVVBLEVBQUU2QixNQUFNLENBQUNaLFVBQVVhLFNBQVM7WUFFbkUsT0FBT0gsSUFBSSxDQUFDLEVBQUU7UUFDaEIsRUFBRSxPQUFPSSxPQUFPO1lBQ2RyQixRQUFRcUIsS0FBSyxDQUFDLGlDQUFpQ0E7WUFDL0MsT0FBTztRQUNUO0lBQ0Y7SUFFQSxhQUFhQyxRQUFRQyxNQUFjLEVBQWdDO1FBQ2pFLElBQUk7WUFDRixNQUFNLEVBQUVDLElBQUksRUFBRUgsS0FBSyxFQUFFLEdBQUcsTUFBTTlCLCtDQUFRQSxDQUNuQ2EsSUFBSSxDQUFDLFNBQ0xELE1BQU0sQ0FBQyxLQUNQWCxFQUFFLENBQUMsTUFBTStCLFFBQ1RFLE1BQU07WUFFVCxJQUFJSixPQUFPLE1BQU1BO1lBQ2pCLE9BQU9HO1FBQ1QsRUFBRSxPQUFPSCxPQUFPO1lBQ2RyQixRQUFRcUIsS0FBSyxDQUFDLHdCQUF3QkE7WUFDdEMsT0FBTztRQUNUO0lBQ0Y7SUFFQSxhQUFhSyxXQUFXSCxNQUFjLEVBQUVJLE9BQThCLEVBQWdDO1FBQ3BHLElBQUk7WUFDRixNQUFNLEVBQUVILElBQUksRUFBRUgsS0FBSyxFQUFFLEdBQUcsTUFBTTlCLCtDQUFRQSxDQUNuQ2EsSUFBSSxDQUFDLFNBQ0x3QixNQUFNLENBQUNELFNBQ1BuQyxFQUFFLENBQUMsTUFBTStCLFFBQ1RwQixNQUFNLEdBQ05zQixNQUFNO1lBRVQsSUFBSUosT0FBTyxNQUFNQTtZQUNqQixPQUFPRztRQUNULEVBQUUsT0FBT0gsT0FBTztZQUNkckIsUUFBUXFCLEtBQUssQ0FBQyx3QkFBd0JBO1lBQ3RDLE9BQU87UUFDVDtJQUNGO0FBQ0YiLCJzb3VyY2VzIjpbIi9ob21lL2Jhc2l0L3BlcnNvbmFsL0dQQS1DYWxjdWxhdG9yL2xpYi9kYXRhYmFzZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2Vyc1RhYmxlIH0gZnJvbSAnQC9zcmMvZGIvc2NoZW1hJ1xuaW1wb3J0IHsgc3VwYWJhc2UgfSBmcm9tICcuL3N1cGFiYXNlJ1xuLy8gaW1wb3J0IHsgZGIgfSBmcm9tICdAL3NyYy9kYidcbmltcG9ydCB7IGVxIH0gZnJvbSAnZHJpenpsZS1vcm0nXG5pbXBvcnQgeyBkYiB9IGZyb20gJ0Avc3JjL2RiJ1xuXG5leHBvcnQgaW50ZXJmYWNlIERhdGFiYXNlVXNlciB7XG4gIGlkOiBzdHJpbmcgLy8gQ2xlcmsgdXNlciBJRFxuICBlbWFpbDogc3RyaW5nXG4gIGZpcnN0X25hbWU6IHN0cmluZyB8IG51bGxcbiAgbGFzdF9uYW1lOiBzdHJpbmcgfCBudWxsXG4gIGZ1bGxfbmFtZTogc3RyaW5nIHwgbnVsbFxuICBpbWFnZV91cmw6IHN0cmluZyB8IG51bGxcbiAgY3JlYXRlZF9hdDogRGF0ZVxuICB1cGRhdGVkX2F0OiBEYXRlXG59XG5cbmV4cG9ydCBjbGFzcyBEYXRhYmFzZU1hbmFnZXIge1xuICBzdGF0aWMgYXN5bmMgY3JlYXRlVXNlcihjbGVya1VzZXI6IHtcbiAgICBpZDogc3RyaW5nXG4gICAgZW1haWxBZGRyZXNzZXM6IEFycmF5PHsgZW1haWxBZGRyZXNzOiBzdHJpbmcgfT5cbiAgICBmaXJzdE5hbWU/OiBzdHJpbmcgfCBudWxsXG4gICAgbGFzdE5hbWU/OiBzdHJpbmcgfCBudWxsXG4gICAgZnVsbE5hbWU/OiBzdHJpbmcgfCBudWxsXG4gICAgaW1hZ2VVcmw/OiBzdHJpbmdcbiAgICB1cGRhdGVkQXQ/OiBEYXRlXG4gICAgY3JlYXRlZEF0PzogRGF0ZVxuICB9KTogUHJvbWlzZTxEYXRhYmFzZVVzZXIgfCBudWxsPiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGVtYWlsID0gY2xlcmtVc2VyLmVtYWlsQWRkcmVzc2VzWzBdPy5lbWFpbEFkZHJlc3MgfHwgJydcbiAgICAgIGNvbnNvbGUubG9nKGVtYWlsKVxuICAgICAgLy8gQ2hlY2sgaWYgdXNlciB3aXRoIGVtYWlsIGFscmVhZHkgZXhpc3RzXG4gICAgICBjb25zdCBleGlzdGluZ1VzZXIgPSBhd2FpdCBkYi5zZWxlY3QoKS5mcm9tKHVzZXJzVGFibGUpLndoZXJlKGVxKHVzZXJzVGFibGUuZW1haWwsIGVtYWlsKSlcbiAgICAgIGNvbnNvbGUubG9nKGV4aXN0aW5nVXNlcilcbiAgICAgIGlmIChleGlzdGluZ1VzZXIubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gZXhpc3RpbmdVc2VyWzBdXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHVzZXJEYXRhID0ge1xuICAgICAgICBpZDogY2xlcmtVc2VyLmlkLFxuICAgICAgICBlbWFpbDogZW1haWwsXG4gICAgICAgIGZpcnN0X25hbWU6IGNsZXJrVXNlci5maXJzdE5hbWUgfHwgbnVsbCxcbiAgICAgICAgbGFzdF9uYW1lOiBjbGVya1VzZXIubGFzdE5hbWUgfHwgbnVsbCxcbiAgICAgICAgZnVsbF9uYW1lOiBjbGVya1VzZXIuZnVsbE5hbWUgfHwgbnVsbCxcbiAgICAgICAgaW1hZ2VfdXJsOiBjbGVya1VzZXIuaW1hZ2VVcmwgfHwgbnVsbCxcbiAgICAgIH1cblxuICAgICAgY29uc3QgdXNlciA9IGF3YWl0IGRiLmluc2VydCh1c2Vyc1RhYmxlKS52YWx1ZXModXNlckRhdGEpLnJldHVybmluZygpXG5cbiAgICAgIHJldHVybiB1c2VyWzBdXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGNyZWF0aW5nL3VwZGF0aW5nIHVzZXI6JywgZXJyb3IpXG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBnZXRVc2VyKHVzZXJJZDogc3RyaW5nKTogUHJvbWlzZTxEYXRhYmFzZVVzZXIgfCBudWxsPiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgIC5mcm9tKCd1c2VycycpXG4gICAgICAgIC5zZWxlY3QoJyonKVxuICAgICAgICAuZXEoJ2lkJywgdXNlcklkKVxuICAgICAgICAuc2luZ2xlKClcblxuICAgICAgaWYgKGVycm9yKSB0aHJvdyBlcnJvclxuICAgICAgcmV0dXJuIGRhdGFcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgdXNlcjonLCBlcnJvcilcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGFzeW5jIHVwZGF0ZVVzZXIodXNlcklkOiBzdHJpbmcsIHVwZGF0ZXM6IFBhcnRpYWw8RGF0YWJhc2VVc2VyPik6IFByb21pc2U8RGF0YWJhc2VVc2VyIHwgbnVsbD4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAuZnJvbSgndXNlcnMnKVxuICAgICAgICAudXBkYXRlKHVwZGF0ZXMpXG4gICAgICAgIC5lcSgnaWQnLCB1c2VySWQpXG4gICAgICAgIC5zZWxlY3QoKVxuICAgICAgICAuc2luZ2xlKClcblxuICAgICAgaWYgKGVycm9yKSB0aHJvdyBlcnJvclxuICAgICAgcmV0dXJuIGRhdGFcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgdXBkYXRpbmcgdXNlcjonLCBlcnJvcilcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICB9XG59ICJdLCJuYW1lcyI6WyJ1c2Vyc1RhYmxlIiwic3VwYWJhc2UiLCJlcSIsImRiIiwiRGF0YWJhc2VNYW5hZ2VyIiwiY3JlYXRlVXNlciIsImNsZXJrVXNlciIsImVtYWlsIiwiZW1haWxBZGRyZXNzZXMiLCJlbWFpbEFkZHJlc3MiLCJjb25zb2xlIiwibG9nIiwiZXhpc3RpbmdVc2VyIiwic2VsZWN0IiwiZnJvbSIsIndoZXJlIiwibGVuZ3RoIiwidXNlckRhdGEiLCJpZCIsImZpcnN0X25hbWUiLCJmaXJzdE5hbWUiLCJsYXN0X25hbWUiLCJsYXN0TmFtZSIsImZ1bGxfbmFtZSIsImZ1bGxOYW1lIiwiaW1hZ2VfdXJsIiwiaW1hZ2VVcmwiLCJ1c2VyIiwiaW5zZXJ0IiwidmFsdWVzIiwicmV0dXJuaW5nIiwiZXJyb3IiLCJnZXRVc2VyIiwidXNlcklkIiwiZGF0YSIsInNpbmdsZSIsInVwZGF0ZVVzZXIiLCJ1cGRhdGVzIiwidXBkYXRlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/database.ts\n");

/***/ }),

/***/ "(rsc)/./lib/supabase.ts":
/*!*************************!*\
  !*** ./lib/supabase.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   supabase: () => (/* binding */ supabase)\n/* harmony export */ });\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/supabase-js */ \"(rsc)/./node_modules/@supabase/supabase-js/dist/module/index.js\");\n\nconst supabaseUrl = \"https://wkjhvxugmxdszjwnueqb.supabase.co\";\nconst supabaseAnonKey = \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indramh2eHVnbXhkc3pqd251ZXFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzMDA0NDQsImV4cCI6MjA2NDg3NjQ0NH0.Scal_zu2omgH4Mf9q_4DLFmjgBuPmJxVMCVl8WL4hxk\";\nconst supabase = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(supabaseUrl, supabaseAnonKey, {\n    realtime: {\n        params: {\n            eventsPerSecond: 2\n        }\n    }\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvc3VwYWJhc2UudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBb0Q7QUFFcEQsTUFBTUMsY0FBY0MsMENBQW9DO0FBQ3hELE1BQU1HLGtCQUFrQkgsa05BQXlDO0FBRTFELE1BQU1LLFdBQVdQLG1FQUFZQSxDQUFDQyxhQUFhSSxpQkFBaUI7SUFDakVHLFVBQVU7UUFDUkMsUUFBUTtZQUNOQyxpQkFBaUI7UUFDbkI7SUFDRjtBQUtGLEdBQUUiLCJzb3VyY2VzIjpbIi9ob21lL2Jhc2l0L3BlcnNvbmFsL0dQQS1DYWxjdWxhdG9yL2xpYi9zdXBhYmFzZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVDbGllbnQgfSBmcm9tIFwiQHN1cGFiYXNlL3N1cGFiYXNlLWpzXCJcblxuY29uc3Qgc3VwYWJhc2VVcmwgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TVVBBQkFTRV9VUkwhXG5jb25zdCBzdXBhYmFzZUFub25LZXkgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TVVBBQkFTRV9BTk9OX0tFWSFcblxuZXhwb3J0IGNvbnN0IHN1cGFiYXNlID0gY3JlYXRlQ2xpZW50KHN1cGFiYXNlVXJsLCBzdXBhYmFzZUFub25LZXksIHtcbiAgcmVhbHRpbWU6IHtcbiAgICBwYXJhbXM6IHtcbiAgICAgIGV2ZW50c1BlclNlY29uZDogMixcbiAgICB9LFxuICB9LFxuICAvLyBPcHRpb25hbGx5IGRpc2FibGUgcmVhbHRpbWUgaWYgbm90IG5lZWRlZFxuICAvLyBnbG9iYWw6IHtcbiAgLy8gICBoZWFkZXJzOiB7ICd4LW15LWN1c3RvbS1oZWFkZXInOiAnbXktYXBwLW5hbWUnIH0sXG4gIC8vIH0sXG59KVxuXG5leHBvcnQgdHlwZSBTZW1lc3RlciA9IHtcbiAgaWQ6IHN0cmluZ1xuICB1c2VyX2lkOiBzdHJpbmdcbiAgbmFtZTogc3RyaW5nXG4gIGNyZWF0ZWRfYXQ6IHN0cmluZ1xufVxuXG5leHBvcnQgdHlwZSBDb3Vyc2UgPSB7XG4gIGlkOiBzdHJpbmdcbiAgc2VtZXN0ZXJfaWQ6IHN0cmluZ1xuICBuYW1lOiBzdHJpbmdcbiAgY3JlZGl0X2hvdXJzOiBudW1iZXJcbiAgZ3BhOiBudW1iZXJcbiAgY3JlYXRlZF9hdDogc3RyaW5nXG59XG5cbmV4cG9ydCB0eXBlIFNlbWVzdGVyV2l0aENvdXJzZXMgPSBTZW1lc3RlciAmIHtcbiAgY291cnNlczogQ291cnNlW11cbn1cbiJdLCJuYW1lcyI6WyJjcmVhdGVDbGllbnQiLCJzdXBhYmFzZVVybCIsInByb2Nlc3MiLCJlbnYiLCJORVhUX1BVQkxJQ19TVVBBQkFTRV9VUkwiLCJzdXBhYmFzZUFub25LZXkiLCJORVhUX1BVQkxJQ19TVVBBQkFTRV9BTk9OX0tFWSIsInN1cGFiYXNlIiwicmVhbHRpbWUiLCJwYXJhbXMiLCJldmVudHNQZXJTZWNvbmQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/supabase.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/@supabase/realtime-js/dist/main sync recursive":
/*!************************************************************!*\
  !*** ./node_modules/@supabase/realtime-js/dist/main/ sync ***!
  \************************************************************/
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = "(rsc)/./node_modules/@supabase/realtime-js/dist/main sync recursive";
module.exports = webpackEmptyContext;

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fusers%2Fsync%2Froute&page=%2Fapi%2Fusers%2Fsync%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fusers%2Fsync%2Froute.ts&appDir=%2Fhome%2Fbasit%2Fpersonal%2FGPA-Calculator%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fbasit%2Fpersonal%2FGPA-Calculator&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fusers%2Fsync%2Froute&page=%2Fapi%2Fusers%2Fsync%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fusers%2Fsync%2Froute.ts&appDir=%2Fhome%2Fbasit%2Fpersonal%2FGPA-Calculator%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fbasit%2Fpersonal%2FGPA-Calculator&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _home_basit_personal_GPA_Calculator_app_api_users_sync_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/users/sync/route.ts */ \"(rsc)/./app/api/users/sync/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/users/sync/route\",\n        pathname: \"/api/users/sync\",\n        filename: \"route\",\n        bundlePath: \"app/api/users/sync/route\"\n    },\n    resolvedPagePath: \"/home/basit/personal/GPA-Calculator/app/api/users/sync/route.ts\",\n    nextConfigOutput,\n    userland: _home_basit_personal_GPA_Calculator_app_api_users_sync_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZ1c2VycyUyRnN5bmMlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRnVzZXJzJTJGc3luYyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRnVzZXJzJTJGc3luYyUyRnJvdXRlLnRzJmFwcERpcj0lMkZob21lJTJGYmFzaXQlMkZwZXJzb25hbCUyRkdQQS1DYWxjdWxhdG9yJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZob21lJTJGYmFzaXQlMkZwZXJzb25hbCUyRkdQQS1DYWxjdWxhdG9yJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNlO0FBQzVGO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvaG9tZS9iYXNpdC9wZXJzb25hbC9HUEEtQ2FsY3VsYXRvci9hcHAvYXBpL3VzZXJzL3N5bmMvcm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL3VzZXJzL3N5bmMvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS91c2Vycy9zeW5jXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS91c2Vycy9zeW5jL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL2hvbWUvYmFzaXQvcGVyc29uYWwvR1BBLUNhbGN1bGF0b3IvYXBwL2FwaS91c2Vycy9zeW5jL3JvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fusers%2Fsync%2Froute&page=%2Fapi%2Fusers%2Fsync%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fusers%2Fsync%2Froute.ts&appDir=%2Fhome%2Fbasit%2Fpersonal%2FGPA-Calculator%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fbasit%2Fpersonal%2FGPA-Calculator&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(rsc)/./src/db/index.ts":
/*!*************************!*\
  !*** ./src/db/index.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   coursesTable: () => (/* reexport safe */ _schema__WEBPACK_IMPORTED_MODULE_1__.coursesTable),\n/* harmony export */   db: () => (/* binding */ db),\n/* harmony export */   semestersTable: () => (/* reexport safe */ _schema__WEBPACK_IMPORTED_MODULE_1__.semestersTable),\n/* harmony export */   usersTable: () => (/* reexport safe */ _schema__WEBPACK_IMPORTED_MODULE_1__.usersTable)\n/* harmony export */ });\n/* harmony import */ var drizzle_orm_postgres_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! drizzle-orm/postgres-js */ \"(rsc)/./node_modules/drizzle-orm/postgres-js/driver.js\");\n/* harmony import */ var postgres__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! postgres */ \"(rsc)/./node_modules/postgres/src/index.js\");\n/* harmony import */ var _schema__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./schema */ \"(rsc)/./src/db/schema.ts\");\n\n// import { migrate } from 'drizzle-orm/postgres-js/migrator'\n\n\nconst client = (0,postgres__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(process.env.DATABASE_URL, {\n    ssl: 'require',\n    prepare: false\n});\nconst db = (0,drizzle_orm_postgres_js__WEBPACK_IMPORTED_MODULE_2__.drizzle)(client, {\n    schema: _schema__WEBPACK_IMPORTED_MODULE_1__\n});\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvZGIvaW5kZXgudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFpRDtBQUNqRCw2REFBNkQ7QUFDOUI7QUFDRztBQUVsQyxNQUFNRyxTQUFTRixvREFBUUEsQ0FBQ0csUUFBUUMsR0FBRyxDQUFDQyxZQUFZLEVBQUc7SUFDakRDLEtBQUs7SUFDTEMsU0FBUztBQUNYO0FBRU8sTUFBTUMsS0FBS1QsZ0VBQU9BLENBQUNHLFFBQVE7SUFBRUQsTUFBTUEsc0NBQUFBO0FBQUMsR0FBRTtBQUVwQiIsInNvdXJjZXMiOlsiL2hvbWUvYmFzaXQvcGVyc29uYWwvR1BBLUNhbGN1bGF0b3Ivc3JjL2RiL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRyaXp6bGUgfSBmcm9tICdkcml6emxlLW9ybS9wb3N0Z3Jlcy1qcydcbi8vIGltcG9ydCB7IG1pZ3JhdGUgfSBmcm9tICdkcml6emxlLW9ybS9wb3N0Z3Jlcy1qcy9taWdyYXRvcidcbmltcG9ydCBwb3N0Z3JlcyBmcm9tICdwb3N0Z3JlcydcbmltcG9ydCAqIGFzIHNjaGVtYSBmcm9tICcuL3NjaGVtYSdcblxuY29uc3QgY2xpZW50ID0gcG9zdGdyZXMocHJvY2Vzcy5lbnYuREFUQUJBU0VfVVJMISwge1xuICBzc2w6ICdyZXF1aXJlJyxcbiAgcHJlcGFyZTogZmFsc2UsIC8vIGRpc2FibGUgcHJlcGFyZWQgc3RhdGVtZW50cyBmb3IgcGdib3VuY2VyXG59KVxuXG5leHBvcnQgY29uc3QgZGIgPSBkcml6emxlKGNsaWVudCwgeyBzY2hlbWEgfSlcblxuZXhwb3J0ICogZnJvbSAnLi9zY2hlbWEnOyJdLCJuYW1lcyI6WyJkcml6emxlIiwicG9zdGdyZXMiLCJzY2hlbWEiLCJjbGllbnQiLCJwcm9jZXNzIiwiZW52IiwiREFUQUJBU0VfVVJMIiwic3NsIiwicHJlcGFyZSIsImRiIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/db/index.ts\n");

/***/ }),

/***/ "(rsc)/./src/db/schema.ts":
/*!**************************!*\
  !*** ./src/db/schema.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   coursesTable: () => (/* binding */ coursesTable),\n/* harmony export */   semestersTable: () => (/* binding */ semestersTable),\n/* harmony export */   usersTable: () => (/* binding */ usersTable)\n/* harmony export */ });\n/* harmony import */ var drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! drizzle-orm/pg-core */ \"(rsc)/./node_modules/drizzle-orm/pg-core/table.js\");\n/* harmony import */ var drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! drizzle-orm/pg-core */ \"(rsc)/./node_modules/drizzle-orm/pg-core/columns/text.js\");\n/* harmony import */ var drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! drizzle-orm/pg-core */ \"(rsc)/./node_modules/drizzle-orm/pg-core/columns/timestamp.js\");\n/* harmony import */ var drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! drizzle-orm/pg-core */ \"(rsc)/./node_modules/drizzle-orm/pg-core/columns/uuid.js\");\n/* harmony import */ var drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! drizzle-orm/pg-core */ \"(rsc)/./node_modules/drizzle-orm/pg-core/columns/integer.js\");\n/* harmony import */ var drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! drizzle-orm/pg-core */ \"(rsc)/./node_modules/drizzle-orm/pg-core/columns/numeric.js\");\n\nconst usersTable = (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_0__.pgTable)('users', {\n    id: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_1__.text)('id').primaryKey(),\n    email: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_1__.text)('email').notNull().unique(),\n    first_name: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_1__.text)('first_name'),\n    last_name: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_1__.text)('last_name'),\n    full_name: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_1__.text)('full_name'),\n    image_url: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_1__.text)('image_url'),\n    created_at: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_2__.timestamp)('created_at').defaultNow().notNull(),\n    updated_at: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_2__.timestamp)('updated_at').defaultNow().notNull()\n});\nconst semestersTable = (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_0__.pgTable)('semesters', {\n    id: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_3__.uuid)('id').defaultRandom().primaryKey(),\n    user_id: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_1__.text)('user_id').references(()=>usersTable.id, {\n        onDelete: 'cascade'\n    }).notNull(),\n    name: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_1__.text)('name').notNull(),\n    created_at: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_2__.timestamp)('created_at').defaultNow().notNull(),\n    updated_at: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_2__.timestamp)('updated_at').defaultNow().notNull()\n});\nconst coursesTable = (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_0__.pgTable)('courses', {\n    id: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_3__.uuid)('id').defaultRandom().primaryKey(),\n    semester_id: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_3__.uuid)('semester_id').references(()=>semestersTable.id, {\n        onDelete: 'cascade'\n    }).notNull(),\n    user_id: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_1__.text)('user_id').references(()=>usersTable.id, {\n        onDelete: 'cascade'\n    }).notNull(),\n    name: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_1__.text)('name').notNull(),\n    credit_hours: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_4__.integer)('credit_hours').notNull(),\n    gpa: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_5__.decimal)('gpa', {\n        precision: 3,\n        scale: 2\n    }).notNull(),\n    created_at: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_2__.timestamp)('created_at').defaultNow().notNull(),\n    updated_at: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_2__.timestamp)('updated_at').defaultNow().notNull()\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvZGIvc2NoZW1hLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFzRjtBQUUvRSxNQUFNTSxhQUFhTiw0REFBT0EsQ0FBQyxTQUFTO0lBQ3pDTyxJQUFJTix5REFBSUEsQ0FBQyxNQUFNTyxVQUFVO0lBQ3pCQyxPQUFPUix5REFBSUEsQ0FBQyxTQUFTUyxPQUFPLEdBQUdDLE1BQU07SUFDckNDLFlBQVlYLHlEQUFJQSxDQUFDO0lBQ2pCWSxXQUFXWix5REFBSUEsQ0FBQztJQUNoQmEsV0FBV2IseURBQUlBLENBQUM7SUFDaEJjLFdBQVdkLHlEQUFJQSxDQUFDO0lBQ2hCZSxZQUFZZCw4REFBU0EsQ0FBQyxjQUFjZSxVQUFVLEdBQUdQLE9BQU87SUFDeERRLFlBQVloQiw4REFBU0EsQ0FBQyxjQUFjZSxVQUFVLEdBQUdQLE9BQU87QUFDMUQsR0FBRTtBQUVLLE1BQU1TLGlCQUFpQm5CLDREQUFPQSxDQUFDLGFBQWE7SUFDakRPLElBQUlKLHlEQUFJQSxDQUFDLE1BQU1pQixhQUFhLEdBQUdaLFVBQVU7SUFDekNhLFNBQVNwQix5REFBSUEsQ0FBQyxXQUFXcUIsVUFBVSxDQUFDLElBQU1oQixXQUFXQyxFQUFFLEVBQUU7UUFBRWdCLFVBQVU7SUFBVSxHQUFHYixPQUFPO0lBQ3pGYyxNQUFNdkIseURBQUlBLENBQUMsUUFBUVMsT0FBTztJQUMxQk0sWUFBWWQsOERBQVNBLENBQUMsY0FBY2UsVUFBVSxHQUFHUCxPQUFPO0lBQ3hEUSxZQUFZaEIsOERBQVNBLENBQUMsY0FBY2UsVUFBVSxHQUFHUCxPQUFPO0FBQzFELEdBQUU7QUFFSyxNQUFNZSxlQUFlekIsNERBQU9BLENBQUMsV0FBVztJQUM3Q08sSUFBSUoseURBQUlBLENBQUMsTUFBTWlCLGFBQWEsR0FBR1osVUFBVTtJQUN6Q2tCLGFBQWF2Qix5REFBSUEsQ0FBQyxlQUFlbUIsVUFBVSxDQUFDLElBQU1ILGVBQWVaLEVBQUUsRUFBRTtRQUFFZ0IsVUFBVTtJQUFVLEdBQUdiLE9BQU87SUFDckdXLFNBQVNwQix5REFBSUEsQ0FBQyxXQUFXcUIsVUFBVSxDQUFDLElBQU1oQixXQUFXQyxFQUFFLEVBQUU7UUFBRWdCLFVBQVU7SUFBVSxHQUFHYixPQUFPO0lBQ3pGYyxNQUFNdkIseURBQUlBLENBQUMsUUFBUVMsT0FBTztJQUMxQmlCLGNBQWN2Qiw0REFBT0EsQ0FBQyxnQkFBZ0JNLE9BQU87SUFDN0NrQixLQUFLdkIsNERBQU9BLENBQUMsT0FBTztRQUFFd0IsV0FBVztRQUFHQyxPQUFPO0lBQUUsR0FBR3BCLE9BQU87SUFDdkRNLFlBQVlkLDhEQUFTQSxDQUFDLGNBQWNlLFVBQVUsR0FBR1AsT0FBTztJQUN4RFEsWUFBWWhCLDhEQUFTQSxDQUFDLGNBQWNlLFVBQVUsR0FBR1AsT0FBTztBQUMxRCxHQUFFIiwic291cmNlcyI6WyIvaG9tZS9iYXNpdC9wZXJzb25hbC9HUEEtQ2FsY3VsYXRvci9zcmMvZGIvc2NoZW1hLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHBnVGFibGUsIHRleHQsIHRpbWVzdGFtcCwgdXVpZCwgaW50ZWdlciwgZGVjaW1hbCB9IGZyb20gJ2RyaXp6bGUtb3JtL3BnLWNvcmUnXG5cbmV4cG9ydCBjb25zdCB1c2Vyc1RhYmxlID0gcGdUYWJsZSgndXNlcnMnLCB7XG4gIGlkOiB0ZXh0KCdpZCcpLnByaW1hcnlLZXkoKSxcbiAgZW1haWw6IHRleHQoJ2VtYWlsJykubm90TnVsbCgpLnVuaXF1ZSgpLFxuICBmaXJzdF9uYW1lOiB0ZXh0KCdmaXJzdF9uYW1lJyksXG4gIGxhc3RfbmFtZTogdGV4dCgnbGFzdF9uYW1lJyksXG4gIGZ1bGxfbmFtZTogdGV4dCgnZnVsbF9uYW1lJyksXG4gIGltYWdlX3VybDogdGV4dCgnaW1hZ2VfdXJsJyksXG4gIGNyZWF0ZWRfYXQ6IHRpbWVzdGFtcCgnY3JlYXRlZF9hdCcpLmRlZmF1bHROb3coKS5ub3ROdWxsKCksXG4gIHVwZGF0ZWRfYXQ6IHRpbWVzdGFtcCgndXBkYXRlZF9hdCcpLmRlZmF1bHROb3coKS5ub3ROdWxsKCksXG59KVxuXG5leHBvcnQgY29uc3Qgc2VtZXN0ZXJzVGFibGUgPSBwZ1RhYmxlKCdzZW1lc3RlcnMnLCB7XG4gIGlkOiB1dWlkKCdpZCcpLmRlZmF1bHRSYW5kb20oKS5wcmltYXJ5S2V5KCksXG4gIHVzZXJfaWQ6IHRleHQoJ3VzZXJfaWQnKS5yZWZlcmVuY2VzKCgpID0+IHVzZXJzVGFibGUuaWQsIHsgb25EZWxldGU6ICdjYXNjYWRlJyB9KS5ub3ROdWxsKCksXG4gIG5hbWU6IHRleHQoJ25hbWUnKS5ub3ROdWxsKCksXG4gIGNyZWF0ZWRfYXQ6IHRpbWVzdGFtcCgnY3JlYXRlZF9hdCcpLmRlZmF1bHROb3coKS5ub3ROdWxsKCksXG4gIHVwZGF0ZWRfYXQ6IHRpbWVzdGFtcCgndXBkYXRlZF9hdCcpLmRlZmF1bHROb3coKS5ub3ROdWxsKCksXG59KVxuXG5leHBvcnQgY29uc3QgY291cnNlc1RhYmxlID0gcGdUYWJsZSgnY291cnNlcycsIHtcbiAgaWQ6IHV1aWQoJ2lkJykuZGVmYXVsdFJhbmRvbSgpLnByaW1hcnlLZXkoKSxcbiAgc2VtZXN0ZXJfaWQ6IHV1aWQoJ3NlbWVzdGVyX2lkJykucmVmZXJlbmNlcygoKSA9PiBzZW1lc3RlcnNUYWJsZS5pZCwgeyBvbkRlbGV0ZTogJ2Nhc2NhZGUnIH0pLm5vdE51bGwoKSxcbiAgdXNlcl9pZDogdGV4dCgndXNlcl9pZCcpLnJlZmVyZW5jZXMoKCkgPT4gdXNlcnNUYWJsZS5pZCwgeyBvbkRlbGV0ZTogJ2Nhc2NhZGUnIH0pLm5vdE51bGwoKSxcbiAgbmFtZTogdGV4dCgnbmFtZScpLm5vdE51bGwoKSxcbiAgY3JlZGl0X2hvdXJzOiBpbnRlZ2VyKCdjcmVkaXRfaG91cnMnKS5ub3ROdWxsKCksXG4gIGdwYTogZGVjaW1hbCgnZ3BhJywgeyBwcmVjaXNpb246IDMsIHNjYWxlOiAyIH0pLm5vdE51bGwoKSxcbiAgY3JlYXRlZF9hdDogdGltZXN0YW1wKCdjcmVhdGVkX2F0JykuZGVmYXVsdE5vdygpLm5vdE51bGwoKSxcbiAgdXBkYXRlZF9hdDogdGltZXN0YW1wKCd1cGRhdGVkX2F0JykuZGVmYXVsdE5vdygpLm5vdE51bGwoKSxcbn0pIl0sIm5hbWVzIjpbInBnVGFibGUiLCJ0ZXh0IiwidGltZXN0YW1wIiwidXVpZCIsImludGVnZXIiLCJkZWNpbWFsIiwidXNlcnNUYWJsZSIsImlkIiwicHJpbWFyeUtleSIsImVtYWlsIiwibm90TnVsbCIsInVuaXF1ZSIsImZpcnN0X25hbWUiLCJsYXN0X25hbWUiLCJmdWxsX25hbWUiLCJpbWFnZV91cmwiLCJjcmVhdGVkX2F0IiwiZGVmYXVsdE5vdyIsInVwZGF0ZWRfYXQiLCJzZW1lc3RlcnNUYWJsZSIsImRlZmF1bHRSYW5kb20iLCJ1c2VyX2lkIiwicmVmZXJlbmNlcyIsIm9uRGVsZXRlIiwibmFtZSIsImNvdXJzZXNUYWJsZSIsInNlbWVzdGVyX2lkIiwiY3JlZGl0X2hvdXJzIiwiZ3BhIiwicHJlY2lzaW9uIiwic2NhbGUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/db/schema.ts\n");

/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/server/app-render/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/action-async-storage.external.js");

/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "?32c4":
/*!****************************!*\
  !*** bufferutil (ignored) ***!
  \****************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?66e9":
/*!********************************!*\
  !*** utf-8-validate (ignored) ***!
  \********************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "node:crypto":
/*!******************************!*\
  !*** external "node:crypto" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:crypto");

/***/ }),

/***/ "node:fs":
/*!**************************!*\
  !*** external "node:fs" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:fs");

/***/ }),

/***/ "node:path":
/*!****************************!*\
  !*** external "node:path" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:path");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ "perf_hooks":
/*!*****************************!*\
  !*** external "perf_hooks" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = require("perf_hooks");

/***/ }),

/***/ "punycode":
/*!***************************!*\
  !*** external "punycode" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("punycode");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/@clerk","vendor-chunks/next","vendor-chunks/@supabase","vendor-chunks/tr46","vendor-chunks/ws","vendor-chunks/whatwg-url","vendor-chunks/tslib","vendor-chunks/cookie","vendor-chunks/webidl-conversions","vendor-chunks/map-obj","vendor-chunks/no-case","vendor-chunks/lower-case","vendor-chunks/snakecase-keys","vendor-chunks/snake-case","vendor-chunks/dot-case","vendor-chunks/drizzle-orm","vendor-chunks/postgres"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fusers%2Fsync%2Froute&page=%2Fapi%2Fusers%2Fsync%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fusers%2Fsync%2Froute.ts&appDir=%2Fhome%2Fbasit%2Fpersonal%2FGPA-Calculator%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fbasit%2Fpersonal%2FGPA-Calculator&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();